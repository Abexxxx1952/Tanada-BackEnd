import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserGql = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
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
