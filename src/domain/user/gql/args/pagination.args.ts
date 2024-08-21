import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationParams } from '../../../../database/abstractRepository/paginationDto/pagination.dto';

@ArgsType()
export class UserPaginationParamsGqlArgs implements PaginationParams {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  offset?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
