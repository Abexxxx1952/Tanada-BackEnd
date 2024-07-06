import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;
}
