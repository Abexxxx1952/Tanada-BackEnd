import { BeforeInsert } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { v5 as uuidv5 } from 'uuid';

import { UserEntity } from '../../../domain/user/entity/user.entity';
import { PhotoEntity } from '../../../domain/photo/entity/photo.entity';
import { PhotoModel } from 'src/swagger/photo/types/photo';
import { Payload } from '../../../domain/user/types/payload';
import { UserPermissionsKeys } from '../../../domain/user/permission/permission';
import { RegistrationSources } from '../../../domain/user/auth/types/providersOAuth.enum';

export class UserModel implements UserEntity {
  @ApiProperty({ type: 'string', format: 'UUID' })
  id: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  email: string;

  password?: string;

  @ApiPropertyOptional()
  icon?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  hashedRefreshToken?: string;

  @ApiProperty({ type: () => Payload, isArray: true })
  payload: Payload[];

  @ApiProperty({ type: () => PhotoModel, isArray: true })
  photo: PhotoEntity[];

  @ApiProperty()
  permissions: UserPermissionsKeys[];

  @ApiProperty()
  registrationSources: RegistrationSources[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}

export class PayloadModel implements Payload {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}
