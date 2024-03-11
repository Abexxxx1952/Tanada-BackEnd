import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';
export class FindUserByConditionsDto {
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', format: 'UUID' })
  readonly id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', format: 'email' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly icon?: string;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoEntity)
  @ApiPropertyOptional({ type: () => PhotoEntity })
  readonly photo?: PhotoEntity[];
}
