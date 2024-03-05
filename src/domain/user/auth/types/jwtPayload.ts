import { PermissionEnumKeys } from '../../permission/permission';

export type JwtPayload = {
  sub: string;
  email: string;
  permissions: PermissionEnumKeys[];
};
