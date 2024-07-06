import { ArgsType, Field } from '@nestjs/graphql';
import { CreatePhotoDto } from '../../dto/create.dto';

@ArgsType()
export class CreatePhotoGqlArgs implements CreatePhotoDto {
  @Field()
  readonly link: string;
}
