import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../domain/user/repository/users.repository';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { users } from './userWithRelationsGenerator';
import { PhotosRepository } from 'src/domain/photo/repository/photos.repository';

@Injectable()
export class UserWithRelationsService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('PhotosRepository')
    private readonly photosRepository: PhotosRepository,
  ) {}

  async seed(count: number): Promise<UserEntity[]> {
    try {
      await this.photosRepository.removeAll();
      await this.usersRepository.removeAll();

      const savedUsers: UserEntity[] = [];
      const usersData = users(count);

      for (const user of usersData) {
        const savedUser = await this.usersRepository.save(user);
        savedUsers.push(savedUser);
        for (const photo of user.photo) {
          await this.photosRepository.save(photo);
        }
      }

      return savedUsers;
    } catch (error) {
      throw error;
    }
  }
}
