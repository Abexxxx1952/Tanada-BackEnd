import { faker } from '@faker-js/faker';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { PhotoEntity } from '../../domain/photo/entity/photo.entity';
import { PhotoStatEntity } from '../../domain/stat/entity/photoStat.entity';
export function users(count: number): UserEntity[] {
  return faker.helpers.multiple(createRandomUser, {
    count,
  });
}

function createRandomUser(): UserEntity {
  const user = new UserEntity();
  user.name = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.icon = faker.image.avatar();
  user.createdAt = faker.date.past();
  user.updatedAt = faker.date.past();
  user.generateId();

  user.photo = createRandomPhotos(user);

  return user;
}

function createRandomPhotos(user: UserEntity): PhotoEntity[] {
  return faker.helpers.multiple(() => createRandomPhoto(user), {
    count: 3,
  });
}

function createRandomPhoto(user: UserEntity): PhotoEntity {
  const photo = new PhotoEntity();
  photo.id = faker.number.int({ min: 1, max: 1000 });
  photo.link = faker.internet.url();
  photo.user = user;
  photo.createdAt = faker.date.past();
  photo.updatedAt = faker.date.past();
  photo.stats = createRandomPhotoStat(photo.id);

  return photo;
}

function createRandomPhotoStat(photoId: number): PhotoStatEntity {
  const photostat = new PhotoStatEntity();
  photostat.id = faker.number.int({ min: 1, max: 100 });
  photostat.createdAt = faker.date.past();
  photostat.viewsCount = faker.number.int({ min: 1, max: 100 });
  photostat.photoId = photoId;

  return photostat;
}
