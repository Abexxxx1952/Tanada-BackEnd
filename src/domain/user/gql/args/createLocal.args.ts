import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserLocalDto } from '../../dto/createLocal.dto';
import { Transform } from 'class-transformer';

@ArgsType()
export class CreateUserGqlArgsLocal implements CreateUserLocalDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly icon?: string;
}
