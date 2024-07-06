import { UserPermissionsKeys } from '../../permission/permission';

export type JwtPayload = {
  sub: string;
  email: string;
  permissions: UserPermissionsKeys[];
};
