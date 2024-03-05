import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, UpdateResult, InsertResult } from 'typeorm';
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

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const entity = this.create({ ...data, user });

      if (!entity) {
        throw new BadRequestException(`Failed to create ${this.entityName}`);
      }
      return await this.save(entity);
    } catch (error) {
      throw error;
    }
  }

  public async updateOnePhotoByIdHard(
    currentUserId: string,
    data: DeepPartial<PhotoEntity>,
  ): Promise<InsertResult> {
    try {
      const user: UserEntity = await this.usersRepository.findOneWithCondition({
        where: {
          id: currentUserId,
          photo: {
            id: data.id,
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.updateOneByIdHard(data);
    } catch (error) {
      throw error;
    }
  }

  public async updateOnePhotoByIdSoft(
    currentUserId: string,
    data: DeepPartial<PhotoEntity>,
  ): Promise<UpdateResult> {
    try {
      const user: UserEntity = await this.usersRepository.findOneWithCondition({
        where: {
          id: currentUserId,
          photo: {
            id: data.id,
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.updateOneByIdSoft(data.id, data);
    } catch (error) {
      throw error;
    }
  }

  public async removePhotoById(
    currentUserId: string,
    id: number,
  ): Promise<PhotoEntity> {
    try {
      const user: UserEntity = await this.usersRepository.findOneWithCondition({
        where: {
          id: currentUserId,
          photo: {
            id: id,
          },
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.removeById(id);
    } catch (error) {
      throw error;
    }
  }
}
