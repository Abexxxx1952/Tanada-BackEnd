import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSignedUploadUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fileName: string;
}
