import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePhotoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly link: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;
}
