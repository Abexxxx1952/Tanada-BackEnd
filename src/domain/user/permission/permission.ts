import { PhotosPermission } from '../../photo/permission/photos.permission.enum';

export const UserPermissions = {
  ...PhotosPermission,
};

type UserPermissionsType = typeof UserPermissions;

export type UserPermissionsKeys = keyof UserPermissionsType;
