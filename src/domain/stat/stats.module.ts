import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StatController } from './stats.controller';
import { UserStatEntity } from './entity/userStat.entity';
import { PhotoStatEntity } from './entity/photoStat.entity';
import { UserStatsRepository } from './repository/userStats.repository';
import { PhotoStatsRepository } from './repository/photoStats.repository';
import { StatsResolver } from './stats.resolver';
import { PhotoViewRepository } from './repository/photoView.repository';
import { PhotoViewEntity } from './entity/photoView.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserStatEntity,
      PhotoStatEntity,
      PhotoViewEntity,
    ]),
    ConfigModule,
  ],
  controllers: [StatController],
  providers: [
    {
      provide: 'UserStatsRepository',
      useClass: UserStatsRepository,
    },
    {
      provide: 'PhotoStatsRepository',
      useClass: PhotoStatsRepository,
    },
    {
      provide: 'PhotoViewRepository',
      useClass: PhotoViewRepository,
    },
    StatsResolver,
  ],
  exports: ['UserStatsRepository', 'PhotoStatsRepository'],
})
export class StatsModule {}
