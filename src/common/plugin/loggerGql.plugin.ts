import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
} from '@apollo/server';
import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/apollo';

interface GraphQLRequestBody {
  operationName?: string;
  query?: string;
  variables?: Record<string, any>;
}
interface SingleResult {
  errors?: [] | undefined;

  data?: Record<string, any> | null;
}
interface GraphQLResponseBody {
  kind?: string;
  singleResult?: SingleResult;
}

@Plugin()
export class LoggerGqlPlugin implements ApolloServerPlugin {
  readonly logger = new Logger('GraphQL Logger');
  private excludeLogFields: string[];
  private variablesSanitized: Record<string, any>;
  private queryMasked: string;

  async requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>,
  ): Promise<GraphQLRequestListener<BaseContext>> {
    const thatLogger = this.logger;
    const start = Date.now();
    const requestBody = requestContext.request.http.body as GraphQLRequestBody;

    const sanitizeVariables = (
      variables: Record<string, any>,
      fieldsToMask: string[],
    ) => {
      const sanitizedVariables: Record<string, any> = {};
      for (const key in variables) {
        if (variables.hasOwnProperty(key)) {
          if (fieldsToMask.includes(key.toLowerCase())) {
            sanitizedVariables[key] = '*****'; // Maskable password
          } else {
            sanitizedVariables[key] = variables[key];
          }
        }
      }
      return sanitizedVariables;
    };

    function maskFieldsInGqlString(gqlString: string, fieldsToMask: string[]) {
      let maskedString = gqlString;

      fieldsToMask.forEach((field) => {
        const regex = new RegExp(`(${field}:\\s*\")([^\"]*)(\")`, 'g');
        maskedString = maskedString.replace(regex, `$1*****$3`);
      });

      return maskedString;
    }

    return {
      async willSendResponse(
        requestContextWillSendResponse: GraphQLRequestContextWillSendResponse<BaseContext>,
      ): Promise<void> {
        const responseTime = Date.now() - start;
        const responseBody = requestContextWillSendResponse.response
          .body as GraphQLResponseBody;

        if (requestBody.variables.excludeLogFields) {
          this.excludeLogFields = requestBody.variables.excludeLogFields;
        }

        if (this.excludeLogFields) {
          this.variablesSanitized = sanitizeVariables(
            requestBody.variables,
            this.excludeLogFields,
          );
          this.queryMasked = maskFieldsInGqlString(
            requestBody.query,
            this.excludeLogFields,
          );
        }

        const requestLogsBody = `Request ---> 
          Query: ${JSON.stringify(this.queryMasked ?? requestBody.query)}
          Variables: ${JSON.stringify(
            this.variablesSanitized ?? requestBody.variables,
          )}
          OperationName: ${JSON.stringify(requestBody.operationName)}
        `;
        const responseLogsBody = `Response <--- 
          Response Time: ${responseTime}ms
          Data: ${JSON.stringify(responseBody.singleResult?.data)}
          
        `;

        if (responseBody.singleResult?.errors) {
          thatLogger.error(requestLogsBody);
          thatLogger.error(responseLogsBody);

          thatLogger.error(
            `${JSON.stringify(responseBody.singleResult?.errors)}`,
          );
        }

        thatLogger.log(requestLogsBody);
        thatLogger.log(responseLogsBody);
      },
    };
  }
}
