import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StatController } from './stats.controller';
import { UserStatEntity } from './entity/userStat.entity';
import { PhotoStatEntity } from './entity/photoStat.entity';
import { UserStatsRepository } from './repository/userStats.repository';
import { PhotoStatsRepository } from './repository/photoStats.repository';
import { StatsResolver } from './stats.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatEntity, PhotoStatEntity]),
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
    StatsResolver,
  ],
  exports: ['UserStatsRepository', 'PhotoStatsRepository'],
})
export class StatsModule {}
