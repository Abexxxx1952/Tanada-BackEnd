import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UserEntity } from '../../user/entity/user.entity';

export class FindPhotoByConditionsDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly link?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  readonly updatedAt?: Date;

  @IsOptional()
  @IsObject()
  @Type(() => UserEntity)
  readonly user?: UserEntity;
}
