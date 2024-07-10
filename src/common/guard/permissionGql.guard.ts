import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserPermissionsKeys } from '../../domain/user/permission/permission';

export const PermissionGuardGql = (
  routePermission: UserPermissionsKeys[],
): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const ctxGql = GqlExecutionContext.create(context);
      const request = ctxGql.getContext().req;
      const user = request.user;

      return routePermission.every((item: UserPermissionsKeys) =>
        user?.permissions.includes(item),
      );
    }
  }

  return mixin(PermissionGuardMixin);
};
