import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsObject, IsOptional } from 'class-validator';

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

@InputType()
export class PhotoOrderObjectGqlInput {
  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  id?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  link?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  createdAt?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  updatedAt?: PhotoDirection | OrderOptions;

  @Field(() => PhotoDirection || OrderOptions, { nullable: true })
  @IsOptional()
  @IsObject()
  user?: PhotoDirection | OrderOptions;
}
