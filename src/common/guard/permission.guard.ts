import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { PermissionEnumKeys } from '../../domain/user/permission/permission';

export const PermissionGuard = (
  routePermission: PermissionEnumKeys[],
): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return routePermission.every((item: PermissionEnumKeys) =>
        user?.permissions.includes(item),
      );
    }
  }

  return mixin(PermissionGuardMixin);
};
