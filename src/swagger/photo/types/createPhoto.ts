import { ApiProperty } from '@nestjs/swagger';
import { CreatePhotoDto } from '../../../domain/photo/dto/create.dto';

export class CreatePhotoArgs implements CreatePhotoDto {
  @ApiProperty()
  readonly link: string;
}
