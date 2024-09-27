import { ApiProperty } from '@nestjs/swagger';
import { UpdatePhotoDto } from '../../../domain/photo/dto/update.dto';

export class UpdatePhotoArgs implements UpdatePhotoDto {
  @ApiProperty()
  readonly link?: string;

  @ApiProperty()
  readonly sortId?: number;

  @ApiProperty()
  readonly id: number;
}
