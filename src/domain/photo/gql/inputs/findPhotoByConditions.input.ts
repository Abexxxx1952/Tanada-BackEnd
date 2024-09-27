import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { FindPhotoByConditionsDto } from '../../dto/findByConditions.dto';
import { UserGqlInput } from '../../../user/gql/inputs/user.input';

@InputType()
export class FindPhotoByConditionsGqlInput implements FindPhotoByConditionsDto {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly link?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  sortId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;

  @Field(() => UserGqlInput, { nullable: true })
  @IsOptional()
  @IsObject()
  readonly user?: UserGqlInput;
}
