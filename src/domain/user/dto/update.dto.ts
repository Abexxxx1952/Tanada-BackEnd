import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly icon?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiPropertyOptional({
    isArray: true,
    type: Object,
  })
  payload?: Record<string, string>[];
}
