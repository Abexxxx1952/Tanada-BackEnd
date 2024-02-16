import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { Type } from 'class-transformer';
export class FindByConditionsDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly link?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly updatedAt?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserEntity)
  readonly user?: UserEntity;
}
