import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, UpdateResult, FindOneOptions } from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoEntity } from '../entity/photo.entity';
import { UsersRepository } from '../../user/repository/users.repository';
import { UserEntity } from '../../user/entity/user.entity';
import { ExternalStorageService } from 'src/externalStorage/externalStorage.service';
import { CreateSignedUploadUrlResult } from 'src/externalStorage/types/createSignedUploadUrlResult';
import { CreatePhotoDto } from '../dto/create.dto';
import { CreateSignedUploadUrlDto } from '../dto/createSignedUploadUrl.dto';
import { ConfigService } from '@nestjs/config';
import { PhotoStatsRepository } from 'src/domain/stat/repository/photoStats.repository';

@Injectable()
export class PhotosRepository extends BaseAbstractRepository<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly PhotosRepository: Repository<PhotoEntity>,
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
    private readonly externalStorageService: ExternalStorageService,
    private readonly configService: ConfigService,
  ) {
    super(PhotosRepository, 'Photo');
  }

  public async createSignedUploadUrl(
    currentUserId: string,
    data: CreateSignedUploadUrlDto,
  ): Promise<CreateSignedUploadUrlResult> {
    try {
      const result = await this.externalStorageService.createSignedUploadUrl(
        data.fileName,
      );

      setTimeout(
        async () => await this.uploadChecker(currentUserId, result.data.path),
        600000,
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  public async createPhoto(
    currentUserId: string,
    data: CreatePhotoDto,
  ): Promise<PhotoEntity> {
    try {
      const user: UserEntity = await this.usersRepository.findOneById(
        currentUserId,
      );

      const entity = this.create({ ...data });

      const photo = await this.save(entity);

      const stats = await this.photoStatsRepository.createPhotoStat(photo.id);
      const photoWithStats = await this.save({ ...photo, stats, user });

      return photoWithStats;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }
  public async updateOnePhotoByIdHard(
    currentUserId: string,
    data: DeepPartial<PhotoEntity>,
  ): Promise<PhotoEntity> {
    const options: FindOneOptions<PhotoEntity> = {
      where: {
        id: data.id,
      },
      relations: ['user'],
    };

    try {
      const entityToUpdate: PhotoEntity = await this.entity.findOne(options);

      if (entityToUpdate && entityToUpdate?.user?.id !== currentUserId) {
        throw new ForbiddenException('Access Denied');
      }

      if (entityToUpdate) {
        Object.assign(entityToUpdate, data);
        return await this.save(entityToUpdate);
      }
      const user: UserEntity = await this.usersRepository.findOneById(
        currentUserId,
      );

      const entity: PhotoEntity = this.create({ ...data, user });

      return await this.entity.save(entity);
    } catch (error) {
      throw error;
    }
  }

  public async updateOnePhotoByIdSoft(
    currentUserId: string,
    data: DeepPartial<PhotoEntity>,
  ): Promise<UpdateResult> {
    try {
      await this.usersRepository.findOneWithCondition({
        where: {
          id: currentUserId,
          photo: {
            id: data.id,
          },
        },
      });

      return await this.entity.update(data.id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }

      throw error;
    }
  }

  public async removePhotoById(
    currentUserId: string,
    id: number,
  ): Promise<PhotoEntity> {
    try {
      const photo = await this.findOneWithCondition({
        where: {
          id: id,
          user: {
            id: currentUserId,
          },
        },
        relations: {
          user: true,
          stats: true,
        },
      });

      const deleteResultFromStorage =
        await this.externalStorageService.deletePhoto(photo.link);

      if (deleteResultFromStorage !== 'DELETED') {
        throw new InternalServerErrorException();
      }
      photo.stats.deleted = 1;
      photo.stats.photoId = null;
      await this.photoStatsRepository.save(photo.stats);

      await this.removeById(id);

      return photo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }

  private async uploadChecker(
    currentUserId: string,
    path: string,
  ): Promise<void> {
    const link = `${this.configService.getOrThrow<string>(
      'SUPABASE_BUCKET_URL',
    )}/${path}`;

    try {
      const user: UserEntity = await this.usersRepository.findOneWithCondition({
        where: {
          id: currentUserId,
          photo: {
            link,
          },
        },
      });
      if (!user) {
        this.externalStorageService.deletePhoto(link);
      }
    } catch (err) {}
  }
}
