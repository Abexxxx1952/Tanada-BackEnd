import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PhotoEntity } from '../../entity/photo.entity';
import { UserGqlModel } from '../../../user/gql/model/user';
import { PhotoStatGqlModel } from '../../../stat/gql/model/photoStat';

@ObjectType('PhotoModel')
export class PhotoGqlModel implements PhotoEntity {
  @Field(() => Int)
  id: number;

  @Field()
  link: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => UserGqlModel)
  user: UserGqlModel;

  @Field(() => PhotoStatGqlModel)
  stats: PhotoStatGqlModel;
}
