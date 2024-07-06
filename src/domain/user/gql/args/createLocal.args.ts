import { Field, ArgsType } from '@nestjs/graphql';
import { CreateUserLocalDto } from '../../dto/createLocal.dto';

@ArgsType()
export class CreateUserGqlArgsLocal implements CreateUserLocalDto {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly icon?: string;
}

/* export class CreateUserDtoLocalWithoutPassword extends CreateUserDtoLocal {
  @IsString()
  @IsNotEmpty()
  @Transform(({ obj }) => {
    return `[${typeof obj.password}]`;
  })
  readonly password: string;
} */
