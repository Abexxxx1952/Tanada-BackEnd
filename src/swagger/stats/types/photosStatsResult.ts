import { ApiProperty } from '@nestjs/swagger';
import { PhotosStatsResult } from '../../../domain/stat/types/photosStatsResult';

export class PhotosStatsResultModel implements PhotosStatsResult {
  @ApiProperty()
  created: number;
  @ApiProperty()
  views: number;
  @ApiProperty()
  deleted: number;
}
