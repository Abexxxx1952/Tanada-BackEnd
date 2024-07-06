import { Field, ID, InputType } from '@nestjs/graphql';
import { UserPermissionsKeys } from '../../permission/permission';
import { v5 as uuidv5 } from 'uuid';
import { RegistrationSources } from '../../auth/types/providersOAuth.enum';
import { PayloadGqlInput } from './payload.input';
import { UserEntity } from '../../entity/user.entity';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';

@InputType('UserInput')
export class UserGqlInput implements UserEntity {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  hashedRefreshToken?: string;

  @Field(() => [PayloadGqlInput], { nullable: true })
  payload: PayloadGqlInput[];

  @Field(() => [PhotoGqlInput], { nullable: true })
  photo: PhotoGqlInput[];

  @Field(() => [String], { nullable: true })
  permissions: UserPermissionsKeys[];

  @Field(() => [String], { nullable: true })
  registrationSources: RegistrationSources[];

  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
