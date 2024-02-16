import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoEntity } from '../entity/photo.entity';

@Injectable()
export class PhotosRepository extends BaseAbstractRepository<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly PhotosRepository: Repository<PhotoEntity>,
  ) {
    super(PhotosRepository, 'Photo');
  }
  public async createPhoto(
    data: DeepPartial<PhotoEntity>,
  ): Promise<PhotoEntity> {
    try {
      const entity = this.create(data);

      return await this.save(entity);
    } catch (error) {
      throw error;
    }
  }
}
