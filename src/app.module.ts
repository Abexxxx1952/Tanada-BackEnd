import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './configs/env.validate';
import { DomainModule } from './domain/domain.module';
import { DatabaseModule } from './database/databaseNestjsTypeorm.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ExternalStorageModule } from './externalStorage/externalStorage.module';

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
        const skipIf = mode === 'production' ? () => false : () => true;
        return [
          {
            ttl: 60000,
            limit: 10,
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

    DatabaseModule,
    ExternalStorageModule,
    DomainModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
