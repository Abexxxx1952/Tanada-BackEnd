import { InputType, Field, registerEnumType } from '@nestjs/graphql';

enum PhotoDirection {
  ASC = 'ASC',
  DESC = 'DESC',
  asc = 'asc',
  desc = 'desc',
  one = 1,
  minusOne = -1,
}

registerEnumType(PhotoDirection, {
  name: 'PhotoDirection',
});

class OrderOptions {
  direction?: Omit<PhotoDirection, 1 | -1>;
  nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
}

@InputType('PhotoOrderObjectInput')
export class PhotoOrderObjectGqlInput {
  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  id?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  link?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  createdAt?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  updatedAt?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  user?: PhotoDirection | OrderOptions;
}
