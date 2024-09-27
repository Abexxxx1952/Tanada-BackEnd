import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/user/entity/user.entity';
import { PhotoStatEntity } from '../../../domain/stat/entity/photoStat.entity';
import { PhotoEntity } from '../../../domain/photo/entity/photo.entity';
import { UserModel } from '../../user/types/user';
import { PhotoStatModel } from '../../stats/types/photoStats';

export class PhotoModel implements PhotoEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  link: string;

  @ApiProperty()
  sortId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({
    type: () => UserModel,
  })
  user: UserEntity;

  @ApiProperty({
    type: () => PhotoStatModel,
  })
  stats: PhotoStatEntity;
}
