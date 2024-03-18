import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  DeepPartial,
  UpdateResult,
  InsertResult,
  FindOptionsWhere,
  FindOneOptions,
} from 'typeorm';
import { BaseAbstractRepository } from '../../../database/abstractRepository/base.abstract.repository';
import { PhotoEntity } from '../entity/photo.entity';
import { UsersRepository } from '../../user/repository/users.repository';
import { UserEntity } from '../../user/entity/user.entity';
import {
  CreateSignedUploadUrlResult,
  ExternalStorageService,
} from 'src/externalStorage/externalStorage.service';
import { CreatePhotoDto } from '../dto/create.dto';
import { CreateSignedUploadUrlDto } from '../dto/createSignedUploadUrl.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotosRepository extends BaseAbstractRepository<PhotoEntity> {
  constructor(
    @InjectRepository(PhotoEntity)
    private readonly PhotosRepository: Repository<PhotoEntity>,
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
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

      const entity = this.create({ ...data, user });

      return await this.save(entity);
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
      });
      const deleteResultFromStorage =
        await this.externalStorageService.deletePhoto(photo.link);

      if (deleteResultFromStorage !== 'DELETED') {
        throw new InternalServerErrorException();
      }
      return await this.removeById(id);
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
    console.log('@Timeout');
    const link = `${this.configService.getOrThrow<string>(
      'SUPABASE_BUCKET_URL',
    )}${path}`;
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
