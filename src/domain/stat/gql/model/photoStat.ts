import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoGqlModel } from '../../../photo/gql/model/photo';
import { PhotoStatEntity } from '../../entity/photoStat.entity';
import { PhotoViewEntity } from '../../entity/photoView.entity';
import { PhotoViewGqlModel } from './photoView';

@ObjectType('PhotoStatModel')
export class PhotoStatGqlModel implements PhotoStatEntity {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  viewsCount?: number;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => Int, { nullable: true })
  photoId?: number;

  @Field(() => PhotoGqlModel)
  photo: PhotoGqlModel;

  @Field(() => [PhotoViewGqlModel], { nullable: true })
  views: PhotoViewGqlModel[];
}
