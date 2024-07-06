import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginationParams } from '../../../../database/abstractRepository/paginationDto/pagination.dto';

@ArgsType()
export class PhotoPaginationParamsGqlArgs implements PaginationParams {
  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
