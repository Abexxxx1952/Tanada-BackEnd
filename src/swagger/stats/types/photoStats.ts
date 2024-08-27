import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from '../../../domain/photo/entity/photo.entity';
import { PhotoStatEntity } from '../../../domain/stat/entity/photoStat.entity';
import { PhotoModel } from '../../photo/types/photo';

export class PhotoStatModel implements PhotoStatEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created?: number;

  @ApiProperty()
  viewsCount?: number;

  @ApiProperty()
  deleted?: number | null;

  @ApiProperty()
  photoId: number | null;

  @ApiProperty({
    type: () => PhotoModel,
  })
  photo: PhotoEntity;
}
