import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UpdatePhotoDto } from '../../dto/update.dto';

@ArgsType()
export class UpdatePhotoGqlArgs implements UpdatePhotoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly link: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
