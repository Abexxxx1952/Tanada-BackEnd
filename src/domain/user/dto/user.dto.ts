import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PhotoEntity } from '../../photo/entity/photo.entity';
import { UserPermissions, UserPermissionsKeys } from '../permission/permission';
import { RegistrationSources } from '../auth/types/providersOAuth.enum';
import { Payload } from '../types/payload';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
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
  readonly photo: PhotoEntity[];

  @IsEnum(UserPermissions, { each: true })
  readonly permissions: UserPermissionsKeys[];

  @IsEnum(RegistrationSources, { each: true })
  registrationSources: RegistrationSources[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  payload?: Payload[];
}
