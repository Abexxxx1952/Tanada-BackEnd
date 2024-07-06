import { ArgsType, Field } from '@nestjs/graphql';
import { CreateSignedUploadUrlDto } from '../../dto/createSignedUploadUrl.dto';

@ArgsType()
export class CreateSignedUploadUrlGqlArgs implements CreateSignedUploadUrlDto {
  @Field()
  readonly fileName: string;
}
