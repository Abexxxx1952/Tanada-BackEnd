import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { UserStatEntity } from '../entity/userStat.entity';

@Injectable()
export class UserStatsRepository extends BaseAbstractRepository<UserStatEntity> {
  constructor(
    @InjectRepository(UserStatEntity)
    private readonly UserStatsRepository: Repository<UserStatEntity>,
  ) {
    super(UserStatsRepository, 'UserStats');
  }

  public async createUserStat(): Promise<UserStatEntity> {
    try {
      const creationStat = this.create({ createdAt: new Date() });
      return await this.save(creationStat);
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserStat(): Promise<UserStatEntity> {
    try {
      const entity = this.create({ deletedAt: new Date() });
      return await this.save(entity);
    } catch (error) {
      throw error;
    }
  }

  public async getUsersStats(): Promise<{
    created: number;
    deleted: number;
  }> {
    try {
      const stats: UserStatEntity[] = await this.findAll();
      const acc = { created: 0, deleted: 0 };
      stats.reduce((acc, stat) => {
        if (stat.createdAt) {
          acc.created += 1;
          return acc;
        }
        if (stat.deletedAt) {
          acc.deleted += 1;
          return acc;
        }

        return acc;
      }, acc);
      return acc;
    } catch (error) {
      throw error;
    }
  }

  public async getUsersStatsByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<{
    created: number;
    deleted: number;
  }> {
    try {
      const created = await this.UserStatsRepository.createQueryBuilder(
        'userStat',
      )
        .where('userStat.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      const deleted = await this.UserStatsRepository.createQueryBuilder(
        'userStat',
      )
        .where('userStat.deletedAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      return {
        created,
        deleted,
      };
    } catch (error) {
      throw error;
    }
  }
}
