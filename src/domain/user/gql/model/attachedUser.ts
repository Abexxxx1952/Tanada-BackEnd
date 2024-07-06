import { Field, ObjectType } from '@nestjs/graphql';
import { UserPermissionsKeys } from '../../permission/permission';

@ObjectType('AttachedUserModel')
export class AttachedUserGqlModel {
  @Field()
  readonly id: string;
  @Field()
  readonly email: string;
  @Field(() => [String])
  readonly permissions: UserPermissionsKeys[];
}
