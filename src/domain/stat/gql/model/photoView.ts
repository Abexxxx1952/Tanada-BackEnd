import { Field, Int, ObjectType } from '@nestjs/graphql';

import { PhotoViewEntity } from '../../entity/photoView.entity';
import { PhotoStatGqlModel } from './photoStat';

@ObjectType('PhotoViewModel')
export class PhotoViewGqlModel implements PhotoViewEntity {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  viewedAt: Date;

  @Field(() => Int)
  photoStatId: number;

  @Field(() => PhotoStatGqlModel)
  photoStat: PhotoStatGqlModel;
}
