import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from '../../../domain/photo/entity/photo.entity';
import { PhotoStatEntity } from '../../../domain/stat/entity/photoStat.entity';
import { PhotoModel } from '../../photo/types/photo';
import { PhotoViewEntity } from 'src/domain/stat/entity/photoView.entity';

export class PhotoStatModel implements PhotoStatEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  viewsCount?: number;

  @ApiProperty()
  deletedAt?: Date | null;

  @ApiProperty()
  photoId: number | null;

  @ApiProperty({
    type: () => PhotoModel,
  })
  photo: PhotoEntity;

  @ApiProperty({
    type: () => PhotoViewEntity,
  })
  views: PhotoViewEntity[];
}
