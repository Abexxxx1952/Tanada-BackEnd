import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoViewEntity } from '../entity/photoView.entity';

@Injectable()
export class PhotoViewRepository extends BaseAbstractRepository<PhotoViewEntity> {
  constructor(
    @InjectRepository(PhotoViewEntity)
    private readonly PhotoViewRepository: Repository<PhotoViewEntity>,
  ) {
    super(PhotoViewRepository, 'PhotoView');
  }
  public async getPhotosViewsByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    try {
      const viewsStats: number =
        await this.PhotoViewRepository.createQueryBuilder('photoView')
          .select('COUNT(photoView.id)', 'totalViews')
          .where('photoView.viewedAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
          })
          .getCount();

      return viewsStats;
    } catch (error) {
      throw error;
    }
  }

  public async getPhotosViewsByDateById(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    try {
      const viewsStats: number =
        await this.PhotoViewRepository.createQueryBuilder('photoView')
          .select('COUNT(photoView.id)', 'totalViews')
          .innerJoin('photoView.photoStat', 'photoStat')
          .innerJoin('photoStat.photo', 'photo')
          .innerJoin('photo.user', 'user')
          .where('user.id = :id', { id })
          .andWhere('photoView.viewedAt BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
          })
          .getCount();

      return viewsStats;
    } catch (error) {
      throw error;
    }
  }
}
