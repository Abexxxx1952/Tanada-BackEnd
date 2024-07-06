import { Field, InputType, Int } from '@nestjs/graphql';
import { PhotoStatEntity } from '../../entity/photoStat.entity';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';

@InputType('PhotosStatsInput')
export class PhotoStatGqlInput implements PhotoStatEntity {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  created?: number;

  @Field(() => Int, { nullable: true })
  viewsCount?: number;

  @Field(() => Int, { nullable: true })
  deleted?: number;

  @Field(() => Int, { nullable: true })
  photoId: number;

  @Field(() => PhotoGqlInput, { nullable: true })
  photo: PhotoGqlInput;
}
