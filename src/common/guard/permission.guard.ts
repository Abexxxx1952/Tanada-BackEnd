/* import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { PermissionEnumKeys } from '../../domain/user/permission/permission';

export const PermissionGuard = (
  permission: PermissionEnumKeys[],
): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.permissions.every((item: PermissionEnumKeysPartial) =>
        permission.includes(item),
      );
    }
  }

  return mixin(PermissionGuardMixin);
};
 */
