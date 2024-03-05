import { PermissionEnumKeys } from '../../permission/permission';

export type AttachedUser = {
  id: string;
  email: string;
  permissions: PermissionEnumKeys[];
};
