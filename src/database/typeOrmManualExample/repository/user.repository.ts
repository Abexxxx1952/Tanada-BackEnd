import { Inject, Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { BaseAbstractRepository } from '../abstractRepository/base.abstract.repository';
import { UserEntity } from '../../../domain/user/entity/user.entity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<UserEntity> {
  constructor(
    @Inject(UserEntity)
    private readonly User: UserEntity,
    @Inject('DATABASE_CONNECTION') private readonly dataSource: DataSource,
  ) {
    super(User, 'User', dataSource);
  }
}
