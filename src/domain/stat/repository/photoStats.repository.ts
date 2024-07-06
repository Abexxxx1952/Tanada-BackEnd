import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoStatEntity } from '../entity/photoStat.entity';

@Injectable()
export class PhotoStatsRepository extends BaseAbstractRepository<PhotoStatEntity> {
  constructor(
    @InjectRepository(PhotoStatEntity)
    private readonly PhotoStatsRepository: Repository<PhotoStatEntity>,
  ) {
    super(PhotoStatsRepository, 'PhotoStats');
  }
  public async createPhotoStat(photoId: number): Promise<PhotoStatEntity> {
    try {
      const photoStatEntity = this.create({
        created: 1,
        photoId,
        viewsCount: 0,
      });
      return await this.save(photoStatEntity);
    } catch (error) {
      throw error;
    }
  }

  public async deletePhotoStat(photoId: number): Promise<PhotoStatEntity> {
    try {
      const photoStatEntity = await this.findOneByCondition({ photoId });
      photoStatEntity.deleted = 1;
      return await this.save(photoStatEntity);
    } catch (error) {
      throw error;
    }
  }

  public async addViewsPhotoStat(photoId: number): Promise<PhotoStatEntity> {
    try {
      const photoStatEntity: PhotoStatEntity = await this.findOneByCondition({
        photoId,
      });

      photoStatEntity.viewsCount += 1;
      return await this.save(photoStatEntity);
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStats(): Promise<{
    created: number;
    views: number;
    deleted: number;
  }> {
    try {
      const stats: PhotoStatEntity[] = await this.findAll();
      const acc = { created: 0, views: 0, deleted: 0 };
      stats.reduce((acc, stat) => {
        if (stat.created) {
          acc.created += stat.created;
          return acc;
        }
        if (stat.deleted) {
          acc.deleted += stat.deleted;
          return acc;
        }
        if (stat.viewsCount) {
          acc.views += stat.viewsCount;
          return acc;
        }

        return acc;
      }, acc);
      return acc;
    } catch (error) {
      throw error;
    }
  }
}
