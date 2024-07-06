import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSignedUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  readonly fileName: string;
}
