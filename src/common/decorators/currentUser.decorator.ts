import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();

      if (!request.user) {
        return null;
      }

      if (data) {
        return request.user[data];
      }

      return request.user;
    }
    const ctxGql = GqlExecutionContext.create(ctx);

    if (!ctxGql.getContext().req.user) {
      return null;
    }
    if (data) {
      return ctxGql.getContext().req.user[data];
    }

    return ctxGql.getContext().req.user;
  },
);
