import {
  ApiProperty,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { UserEntity } from 'src/domain/user/entity/user.entity';
import { LoginDto } from 'src/domain/user/dto/login.dto';
import { AttachedUser } from 'src/domain/user/auth/types/attachedUser';
import { UpdateResult } from 'typeorm';

export function ApiUsersGet() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get all users' })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got all users',
      type: [UserEntity],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Users not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetFindById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get user by id' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiParam({
      name: 'id',
      type: 'UUID',
      example: '11218517-4043-53b0-8c7a-0e9190c419e7',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got the user',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostFindOneBy() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find user by condition:FindOptionsWhere' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got the user',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostFindManyBy() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find users by condition:FindOptionsWhere' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got all user by condition',
      type: [UserEntity],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Users not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostFindOneWith() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find user by condition:FindOneOptions' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got the user by condition',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostFindAllWith() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find users by condition:FindOneOptions' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got all user by condition',
      type: [UserEntity],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Users not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostRegistration() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'User registration' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 201,
      description: 'User is registered',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 409,
      description: 'Conflict. Email has already been taken',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}
export function ApiUsersPostLoginLocal() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Login local user' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiBody({
      type: LoginDto,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'User is logged in',
      type: AttachedUser,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 403,
      description: 'Forbidden',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostLogOut() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Log out user. (AccessToken required)' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'User is logged out',
      type: AttachedUser,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPostRefresh() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Refresh tokens. (RefreshToken required)' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Tokens refreshed',
      schema: {
        type: 'string',
        example: 'Refresh Successful',
      },
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 403,
      description: 'Forbidden',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetLoginGoogle() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Initialization login with Google user' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'User redirected',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetLoginGoogleCallback() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Ending login with Google user' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'User is logged in',
      type: AttachedUser,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetLoginGitHub() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Initialization login with GitHub user' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'User redirected',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetLoginGitHubCallback() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Ending login with GitHub user' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'User is logged in',
      type: AttachedUser,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersGetStatus() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get user information. (AccessToken required)' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got user information',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersPatchUpdate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: 'Update user. (AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'User Updated',
      type: UpdateResult,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiUsersDeleteDelete() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: 'Delete user. (AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'User deleted',
      type: UserEntity,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'User not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}
