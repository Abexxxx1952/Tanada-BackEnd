import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly link?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly sortId?: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
