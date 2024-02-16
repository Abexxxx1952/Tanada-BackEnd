import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';
export class FindByConditionsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly icon?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoEntity)
  @IsOptional()
  readonly photo?: PhotoEntity[];
}
