import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function sensitiveDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const logDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (logDirective) {
        const { fields } = logDirective;
        const originalResolve = fieldConfig.resolve || defaultFieldResolver;

        fieldConfig.resolve = async function (source, args, context, info) {
          context.req.body.variables = {
            ...context.req.body.variables,
            excludeLogFields: fields,
          };

          // Call original resolver
          return originalResolve(source, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
}
