import { ApiPropertyOptional } from '@nestjs/swagger';

import { FindPhotoByConditionsDto } from '../../../domain/photo/dto/findByConditions.dto';
import { UserEntity } from '../../../domain/user/entity/user.entity';
import { UserModel } from '../../user/types/user';

export class FindPhotoByConditionsArgs implements FindPhotoByConditionsDto {
  @ApiPropertyOptional()
  readonly id?: number;

  @ApiPropertyOptional()
  readonly link?: string;

  @ApiPropertyOptional()
  readonly sortId: number;

  @ApiPropertyOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional()
  readonly updatedAt?: Date;

  @ApiPropertyOptional({ type: () => UserModel })
  readonly user?: UserEntity;
}
