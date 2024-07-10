import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';

enum UserDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  asc = 'asc',
  desc = 'desc',
  one = 1,
  minusOne = -1,
}

registerEnumType(UserDirection, {
  name: 'UserDirection',
});

class OrderOptions {
  direction?: Omit<UserDirection, 1 | -1>;
  nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
}

@InputType()
export class UserOrderObjectGqlInput {
  @Field(() => UserDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  id?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  link?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  createdAt?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  updatedAt?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  user?: UserDirection | OrderOptions;
}
