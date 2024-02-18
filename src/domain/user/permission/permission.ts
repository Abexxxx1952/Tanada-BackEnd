import { PhotosPermission } from '../../photo/permission/photos.permission.enum';

export const PermissionEnum = {
  ...PhotosPermission,
};

type PermissionEnumType = typeof PermissionEnum;

export type PermissionEnumKeys = keyof PermissionEnumType;
