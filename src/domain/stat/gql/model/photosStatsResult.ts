import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotosStatsResult } from '../../types/photosStatsResult';

@ObjectType('PhotosStatsResultModel')
export class PhotosStatsResultGqlModel implements PhotosStatsResult {
  @Field(() => Int)
  created: number;
  @Field(() => Int)
  views: number;
  @Field(() => Int)
  deleted: number;
}
