import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
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
      const creationStat = this.create({ created: 1 });
      return await this.save(creationStat);
    } catch (error) {
      throw error;
    }
  }

  public async deleteUserStat(): Promise<UserStatEntity> {
    try {
      const entity = this.create({ deleted: 1 });
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
        if (acc.created) {
          acc.created += stat.created;
          return acc;
        }

        acc.deleted += stat.deleted;
        return acc;
      }, acc);
      return acc;
    } catch (error) {
      throw error;
    }
  }
}
