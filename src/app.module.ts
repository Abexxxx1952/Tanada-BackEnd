import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { join } from 'path';
import { validate } from './configs/env.validate';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/databaseNestjsTypeorm.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ExternalStorageModule } from './externalStorage/externalStorage.module';
import { LoggerGqlPlugin } from './common/plugin/loggerGql.plugin';
import { sensitiveDirectiveTransformer } from './common/directive/sensitive.directive';

import { GraphqlTypesModule } from './graphql/graphqlTypeController/graphqlType.module';
import { LoggerHelperInterceptor } from './common/interceptors/loggerHelper.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validate,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mode = configService.getOrThrow('MODE');
        const ttl = configService.getOrThrow('THROTTLER_TTL');
        const limit = configService.getOrThrow('THROTTLER_LIMIT');
        const skipIf = mode === 'production' ? () => false : () => true;
        return [
          {
            ttl,
            limit,
            skipIf,
          },
        ];
      },

      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const ttlProd = configService.getOrThrow('CACHE_TTL');
        const mode = configService.getOrThrow('MODE');
        const ttl = mode === 'production' ? ttlProd : 0;
        return {
          ttl,
        };
      },
      isGlobal: true,
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        playground: { settings: { 'request.credentials': 'include' } }, // for cookies in playground
        autoSchemaFile:
          configService.getOrThrow<string>('MODE') === 'production'
            ? false
            : join(process.cwd(), 'src', 'graphql', 'schema.gql'),

        definitions:
          configService.getOrThrow<string>('MODE') === 'production'
            ? null
            : {
                path: join(process.cwd(), 'src', 'graphql', 'index.ts'),
                outputAs: 'class',
              },
        context: ({ req, res }) => ({ req, res }), // for cookies
        transformSchema: (schema) =>
          sensitiveDirectiveTransformer(schema, 'sensitive'),
        buildSchemaOptions: {
          directives: [
            new GraphQLDirective({
              name: 'sensitive',
              locations: [DirectiveLocation.FIELD_DEFINITION],
              args: {
                fields: {
                  type: new GraphQLList(GraphQLString),
                },
              },
            }),
          ],
        },
        plugins: [new LoggerGqlPlugin()],
      }),
    }),

    DatabaseModule,
    ExternalStorageModule,
    GraphqlTypesModule,
    DomainModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerHelperInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
