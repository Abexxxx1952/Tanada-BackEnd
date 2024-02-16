import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoEntity } from '../entity/photo.entity';
import { UsersRepository } from '../../user/repository/users.repository';
import { UserEntity } from '../../user/entity/user.entity';

@Injectable()
export class PhotosRepository extends BaseAbstractRepository<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly PhotosRepository: Repository<PhotoEntity>,
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {
    super(PhotosRepository, 'Photo');
  }
  public async createPhoto(
    currentUserId: string,
    data: DeepPartial<PhotoEntity>,
  ): Promise<PhotoEntity> {
    try {
      const user: UserEntity = await this.usersRepository.findOneById(
        currentUserId,
      );

      const entity = this.create({ ...data, user });

      return await this.save(entity);
    } catch (error) {
      throw error;
    }
  }
}
