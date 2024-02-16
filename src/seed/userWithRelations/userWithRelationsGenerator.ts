import { faker } from '@faker-js/faker';
import { UserEntity } from '../../domain/user/entity/user.entity';
import { PhotoEntity } from '../../domain/photo/entity/photo.entity';

function createRandomPhoto(user: UserEntity): PhotoEntity {
  const photo = new PhotoEntity();
  photo.id = faker.datatype.number({ min: 1 });
  photo.link = faker.internet.url();
  photo.user = user;
  photo.createdAt = faker.date.past();
  photo.updatedAt = faker.date.past();

  return photo;
}
function createRandomPhotos(user: UserEntity): PhotoEntity[] {
  return faker.helpers.multiple(() => createRandomPhoto(user), {
    count: 3,
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

export function users(count: number): UserEntity[] {
  return faker.helpers.multiple(createRandomUser, {
    count,
  });
}
