import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/domain/user/entity/user.entity';

export class FindPhotoByConditionsDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly link?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly updatedAt?: Date;

  @IsOptional()
  @IsObject()
  @Type(() => UserEntity)
  @ApiPropertyOptional({ type: () => UserEntity })
  readonly user?: UserEntity;
}
