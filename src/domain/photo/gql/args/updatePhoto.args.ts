import { ArgsType, Field, Int } from '@nestjs/graphql';
import { UpdatePhotoDto } from '../../dto/update.dto';

@ArgsType()
export class UpdatePhotoGqlArgs implements UpdatePhotoDto {
  @Field()
  readonly link: string;

  @Field(() => Int)
  readonly id: number;
}
