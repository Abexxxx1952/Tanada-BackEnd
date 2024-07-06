import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
