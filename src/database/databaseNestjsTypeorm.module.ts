import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseLogger } from './logger/dbLogger';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const DBType = configService.getOrThrow('DATABASE_TYPE');
        return {
          type: DBType,
          url: configService.getOrThrow('DB_CONNECTION_STRING'),
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize:
            configService.getOrThrow('MODE') === 'production' ? false : true,
          migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
          logger: new DatabaseLogger(),
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule implements OnModuleDestroy, OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource) {
      console.log('Data Source has been created!');
    }
  }
  async onModuleDestroy() {
    if (this.dataSource) {
      await this.dataSource.destroy();
      console.log('Data Source has been destroyed!');
    }
  }
}
