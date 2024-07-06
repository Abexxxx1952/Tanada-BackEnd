import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/user/repository/users.repository';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { users } from './userWithRelationsGenerator';
import { PhotosRepository } from 'src/domain/photo/repository/photos.repository';
import { UserStatsRepository } from 'src/domain/stat/repository/userStats.repository';
import { PhotoStatsRepository } from 'src/domain/stat/repository/photoStats.repository';

@Injectable()
export class UserWithRelationsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('PhotosRepository')
    private readonly photosRepository: PhotosRepository,
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject('PhotoStatsRepository')
    private readonly photoStatsRepository: PhotoStatsRepository,
  ) {}

  async seed(count: number): Promise<UserEntity[]> {
    try {
      await this.userStatsRepository.removeAll();
      await this.photoStatsRepository.removeAll();
      await this.photosRepository.removeAll();
      await this.usersRepository.removeAll();

      const savedUsers: UserEntity[] = [];
      const usersData = users(count);

      for (const user of usersData) {
        const savedUser = await this.usersRepository.save(user);
        await this.userStatsRepository.createUserStat();
        savedUsers.push(savedUser);
        for (const photo of user.photo) {
          await this.photosRepository.save(photo);
          await this.photoStatsRepository.createPhotoStat(photo.id);
        }
      }

      return savedUsers;
    } catch (error) {
      throw error;
    }
  }
}
