import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePhotoDto } from '../../dto/create.dto';

@ArgsType()
export class CreatePhotoGqlArgs implements CreatePhotoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly link: string;
}
