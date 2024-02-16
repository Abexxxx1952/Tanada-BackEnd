import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: (configService: ConfigService) => {
        const DBType = configService.getOrThrow('DATABASE_TYPE');
        const AppDataSource = new DataSource({
          type: DBType,
          url: configService.getOrThrow('DB_CONNECTION_STRING'),
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize:
            configService.getOrThrow('MODE') === 'production' ? false : true,
          migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
          logging: false,
        });

        AppDataSource.initialize()
          .then(() => {
            console.log('Data Source has been initialized!');
          })
          .catch((err) => {
            console.error('Error during Data Source initialization', err);
          });

        return AppDataSource;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly dataSource: DataSource,
  ) {}

  async onModuleDestroy() {
    if (this.dataSource) {
      try {
        await this.dataSource.destroy();
        console.log('Data Source has been destroyed!');
      } catch (err) {
        console.error('Error during Data Source destruction', err);
      }
    }
  }
}
