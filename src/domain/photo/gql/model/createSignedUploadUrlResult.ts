import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateSignedUploadUrlResultData')
class CreateSignedUploadUrlResultGqlData {
  @Field()
  signedUrl: string;

  @Field()
  token: string;

  @Field()
  path: string;
}

@ObjectType()
class Error {
  @Field()
  message: string;
}

@ObjectType('CreateSignedUploadUrlResultModel')
export class CreateSignedUploadUrlResultGqlModel {
  @Field(() => CreateSignedUploadUrlResultGqlData, { nullable: true })
  data: CreateSignedUploadUrlResultGqlData | null;

  @Field(() => Error, { nullable: true })
  error: null | Error;
}
