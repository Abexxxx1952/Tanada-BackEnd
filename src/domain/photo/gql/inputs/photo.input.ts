import { Field, InputType, Int } from '@nestjs/graphql';
import { PhotoEntity } from '../../entity/photo.entity';
import { UserGqlInput } from '../../../user/gql/inputs/user.input';
import { PhotoStatGqlInput } from '../../../stat/gql/inputs/photoStat.input';

@InputType('PhotoInput')
export class PhotoGqlInput implements PhotoEntity {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  link: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => UserGqlInput, { nullable: true })
  user: UserGqlInput;

  @Field(() => PhotoStatGqlInput, { nullable: true })
  stats: PhotoStatGqlInput;
}
