import { InputType, Field, registerEnumType } from '@nestjs/graphql';

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

@InputType('UserOrderObjectInput')
export class UserOrderObjectGqlInput {
  @Field(() => UserDirection || OrderOptions, { nullable: true })
  id?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  link?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  createdAt?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  updatedAt?: UserDirection | OrderOptions;

  @Field(() => UserDirection || OrderOptions, { nullable: true })
  user?: UserDirection | OrderOptions;
}
