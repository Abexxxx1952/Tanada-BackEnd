import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PhotoGqlModel } from '../../../photo/gql/model/photo';
import { UserPermissionsKeys } from '../../permission/permission';
import { v5 as uuidv5 } from 'uuid';
import { RegistrationSources } from '../../auth/types/providersOAuth.enum';
import { PayloadEGqlModel } from './payload';
import { UserEntity } from '../../entity/user.entity';

@ObjectType('UserModel')
export class UserGqlModel implements UserEntity {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  hashedRefreshToken?: string;

  @Field(() => [PayloadEGqlModel], { nullable: true })
  payload: PayloadEGqlModel[];

  @Field(() => [PhotoGqlModel], { nullable: true })
  photo: PhotoGqlModel[];

  @Field(() => [String])
  permissions: UserPermissionsKeys[];

  @Field(() => [String])
  registrationSources: RegistrationSources[];

  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
