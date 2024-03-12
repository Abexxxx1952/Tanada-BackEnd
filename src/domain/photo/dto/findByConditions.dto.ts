import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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
  readonly updatedAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserEntity)
  @ApiPropertyOptional({ type: () => UserEntity })
  readonly user?: UserEntity;
}
