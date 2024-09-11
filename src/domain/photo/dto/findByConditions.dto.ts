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
import { PhotoStatEntity } from '../../stat/entity/photoStat.entity';

export class FindPhotoByConditionsDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly link?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly updatedAt?: Date;

  @IsOptional()
  @IsObject()
  @Type(() => UserEntity)
  readonly user?: UserEntity;

  @IsOptional()
  @IsObject()
  @Type(() => PhotoStatEntity)
  readonly stats?: PhotoStatEntity;
}
