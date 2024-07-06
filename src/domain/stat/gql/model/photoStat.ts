import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoGqlModel } from '../../../photo/gql/model/photo';
import { PhotoStatEntity } from '../../entity/photoStat.entity';

@ObjectType('PhotoStatModel')
export class PhotoStatGqlModel implements PhotoStatEntity {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  created?: number;

  @Field(() => Int, { nullable: true })
  viewsCount?: number;

  @Field(() => Int, { nullable: true })
  deleted?: number;

  @Field(() => Int)
  photoId: number;

  @Field(() => PhotoGqlModel)
  photo: PhotoGqlModel;
}
