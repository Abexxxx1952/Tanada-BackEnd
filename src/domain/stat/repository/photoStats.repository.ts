import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoStatEntity } from '../entity/photoStat.entity';
import { PhotoViewRepository } from './photoView.repository';
import { PhotoViewEntity } from '../entity/photoView.entity';
import { PhotosStatsResult } from '../types/photosStatsResult';

@Injectable()
export class PhotoStatsRepository extends BaseAbstractRepository<PhotoStatEntity> {
  constructor(
    @InjectRepository(PhotoStatEntity)
    private readonly PhotoStatsRepository: Repository<PhotoStatEntity>,
    @Inject('PhotoViewRepository')
    private readonly photoViewRepository: PhotoViewRepository,
  ) {
    super(PhotoStatsRepository, 'PhotoStats');
  }
  public async createPhotoStat(photoId: number): Promise<PhotoStatEntity> {
    try {
      const photoStatEntity = this.create({
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
      photoStatEntity.deletedAt = new Date();
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
      const photoStatEntitySaved = await this.save(photoStatEntity);

      const photoView = new PhotoViewEntity();
      photoView.photoStatId = photoStatEntity.id;
      photoView.viewedAt = new Date();
      await this.photoViewRepository.save(photoView);

      return photoStatEntitySaved;
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
      stats.forEach((stat) => {
        if (stat.createdAt) {
          acc.created += 1;
          acc.views += stat.viewsCount;
        }
        if (stat.deletedAt) {
          acc.deleted += 1;
        }
      });

      return acc;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsById(id: string): Promise<{
    created: number;
    views: number;
    deleted: number;
  }> {
    const condition: FindOptionsWhere<PhotoStatEntity> = {
      photo: { user: { id } },
    };
    try {
      const stats: PhotoStatEntity[] = await this.findAllWithCondition({
        where: condition,
        relations: ['photo', 'photo.user'],
      });

      const acc = { created: 0, views: 0, deleted: 0 };
      stats.forEach((stat) => {
        if (stat.createdAt) {
          acc.created += 1;
          acc.views += stat.viewsCount;
        }
        if (stat.deletedAt) {
          acc.deleted += 1;
        }
      });

      return acc;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<PhotosStatsResult> {
    try {
      const created = await this.PhotoStatsRepository.createQueryBuilder(
        'photoStat',
      )
        .where('photoStat.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      const views = await this.photoViewRepository.getPhotosViewsByDate(
        startDate,
        endDate,
      );

      const deleted = await this.PhotoStatsRepository.createQueryBuilder(
        'photoStat',
      )
        .where('photoStat.deletedAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      return {
        created,
        views,
        deleted,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsByDateById(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<PhotosStatsResult> {
    try {
      const created = await this.PhotoStatsRepository.createQueryBuilder(
        'photoStat',
      )
        .innerJoin('photoStat.photo', 'photo')
        .innerJoin('photo.user', 'user')
        .where('user.id = :id', { id })
        .where('photoStat.createdAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      const views = await this.photoViewRepository.getPhotosViewsByDateById(
        id,
        startDate,
        endDate,
      );

      const deleted = await this.PhotoStatsRepository.createQueryBuilder(
        'photoStat',
      )
        .innerJoin('photoStat.photo', 'photo')
        .innerJoin('photo.user', 'user')
        .where('user.id = :id', { id })
        .where('photoStat.deletedAt BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getCount();

      return {
        created,
        views,
        deleted,
      };
    } catch (error) {
      throw error;
    }
  }
  public async getPhotosStatsForCurrentYearByMonth(): Promise<
    PhotosStatsResult[]
  > {
    try {
      const now = new Date();
      const statsByMonth: PhotosStatsResult[] = [];

      for (let month = 0; month < 12; month++) {
        const startDate = new Date(
          now.getFullYear(),
          now.getMonth() - month,
          1,
        );
        const endDate = new Date(
          now.getFullYear(),
          now.getMonth() - month + 1,
          0,
          23,
          59,
          59,
        );

        const monthStats = await this.getPhotosStatsByDate(startDate, endDate);
        statsByMonth.push(monthStats);
      }

      return statsByMonth.reverse();
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsForCurrentYearByMonthById(
    id: string,
  ): Promise<PhotosStatsResult[]> {
    try {
      const now = new Date();
      const statsByMonth: PhotosStatsResult[] = [];

      for (let month = 0; month < 12; month++) {
        const startDate = new Date(
          now.getFullYear(),
          now.getMonth() - month,
          1,
        );
        const endDate = new Date(
          now.getFullYear(),
          now.getMonth() - month + 1,
          0,
          23,
          59,
          59,
        );

        const monthStats = await this.getPhotosStatsByDateById(
          id,
          startDate,
          endDate,
        );
        statsByMonth.push(monthStats);
      }

      return statsByMonth.reverse();
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsForCurrentMonthByWeek(): Promise<
    PhotosStatsResult[]
  > {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59);

      const statsByWeek: PhotosStatsResult[] = [];
      const currentWeekStart = new Date(startDate);

      while (currentWeekStart <= endDate) {
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
        currentWeekEnd.setHours(23, 59, 59);

        if (currentWeekEnd > endDate) {
          currentWeekEnd.setTime(endDate.getTime());
        }

        const weekStats = await this.getPhotosStatsByDate(
          currentWeekStart,
          currentWeekEnd,
        );
        statsByWeek.push(weekStats);

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }

      return statsByWeek;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsForCurrentMonthByWeekById(
    id: string,
  ): Promise<PhotosStatsResult[]> {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0, 23, 59, 59);

      const statsByWeek: PhotosStatsResult[] = [];
      const currentWeekStart = new Date(startDate);

      while (currentWeekStart <= endDate) {
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
        currentWeekEnd.setHours(23, 59, 59);

        if (currentWeekEnd > endDate) {
          currentWeekEnd.setTime(endDate.getTime());
        }

        const weekStats = await this.getPhotosStatsByDateById(
          id,
          currentWeekStart,
          currentWeekEnd,
        );
        statsByWeek.push(weekStats);

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }

      return statsByWeek;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsForLast7Days(): Promise<PhotosStatsResult[]> {
    try {
      const now = new Date();
      const statsByDay: PhotosStatsResult[] = [];

      for (let i = 0; i < 7; i++) {
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - i);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59);

        const dayStats = await this.getPhotosStatsByDate(startDate, endDate);
        statsByDay.push(dayStats);
      }

      return statsByDay.reverse();
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosStatsForLast7DaysById(
    id: string,
  ): Promise<PhotosStatsResult[]> {
    try {
      const now = new Date();
      const statsByDay: PhotosStatsResult[] = [];

      for (let i = 0; i < 7; i++) {
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - i);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setHours(23, 59, 59);

        const dayStats = await this.getPhotosStatsByDateById(
          id,
          startDate,
          endDate,
        );
        statsByDay.push(dayStats);
      }

      return statsByDay.reverse();
    } catch (error) {
      throw error;
    }
  }
}
