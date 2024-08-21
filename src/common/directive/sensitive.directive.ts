import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

export function sensitiveDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  if (!schema) {
    const schemaPath = join(process.cwd(), 'src', 'graphql', 'schema.gql');
    const typeDefs = loadSchemaSync(schemaPath, {
      loaders: [new GraphQLFileLoader()],
    });

    schema = makeExecutableSchema({ typeDefs });
  }

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
