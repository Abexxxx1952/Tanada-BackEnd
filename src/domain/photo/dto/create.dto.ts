import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly link: string;
}
