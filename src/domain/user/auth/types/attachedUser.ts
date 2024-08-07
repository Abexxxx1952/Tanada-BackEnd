import { UserPermissionsKeys } from '../../permission/permission';

export class AttachedUser {
  readonly id: string;
  readonly email: string;
  readonly permissions: UserPermissionsKeys[];
}
