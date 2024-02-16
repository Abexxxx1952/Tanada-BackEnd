import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsString()
  @IsNotEmpty()
  readonly link: string;
}
