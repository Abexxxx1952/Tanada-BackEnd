import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly icon?: string;

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoEntity)
  @IsOptional()
  readonly photo?: PhotoEntity[];
}
