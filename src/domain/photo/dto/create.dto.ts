import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  readonly link: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
