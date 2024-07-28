import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  FindAllPhotosWithConditionsDto,
  FindOnePhotoWithConditionsDto,
} from '../types/findWithConditions';
import { PaginationParamsArgs } from '../types/paginationParams';
import { PhotoModel } from './types/photo';
import {
  CreateSignedUploadUrlArgs,
  CreateSignedUploadUrlResultModel,
} from './types/createSignedUploadUrlResult';
import { UpdateResultModel } from '../types/updateResult';
import { FindPhotoByConditionsArgs } from './types/findPhotoByConditions';
import { CreatePhotoArgs } from './types/createPhoto';
import { UpdatePhotoArgs } from './types/updatePhoto';
import { FindPhotosByStringConditionWithPaginationParams } from './types/findPhotosByStringCondition';
import { FindPhotosWithStringConditionWithPaginationParams } from './types/findPhotosWithStringCondition';

export function ApiPhotosGet() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get all photos' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ type: PaginationParamsArgs })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got all photos',
      type: [PhotoModel],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photos not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosGetFindById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photo by id' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiParam({
      name: 'id',
      type: 'number',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got the photo',
      type: PhotoModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photos not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostFindOneBy() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find photo by condition:FindOptionsWhere' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ type: FindPhotoByConditionsArgs })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got the photo',
      type: PhotoModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Invalid JSON format',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Validation failed: ',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photo not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostFindManyBy() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find photos by condition:FindOptionsWhere' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ type: FindPhotosByStringConditionWithPaginationParams })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got all photos by condition',
      type: [PhotoModel],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Invalid JSON format',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Validation failed: ',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photos not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostFindOneWith() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find photo by condition:FindOneOptions' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ type: FindOnePhotoWithConditionsDto })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got the photo by condition',
      type: PhotoModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Invalid JSON format',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Validation failed: ',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photos not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostFindAllWith() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Find photos by condition:FindOneOptions' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ type: FindPhotosWithStringConditionWithPaginationParams })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got all photos by condition',
      type: [PhotoModel],
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Invalid JSON format',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Validation failed: ',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'Photos not found',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostCreateSignedUploadUrl() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary:
        'SignedUploadUrl creation. (CreatePhoto permission required. AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiBody({ type: CreateSignedUploadUrlArgs })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 201,
      description: 'SignedUploadUrl is created',
      type: CreateSignedUploadUrlResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
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
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPostCreate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary:
        'Photo creation. (CreatePhoto permission required. AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiBody({ type: CreatePhotoArgs })(target, propertyKey, descriptor);
    ApiResponse({
      status: 201,
      description: 'Photo is created',
      type: PhotoModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
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
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPutUpdatePhotoHard() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary:
        'Update photo. (UpdatePhoto permission required. AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiBody({ type: UpdatePhotoArgs })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Photo Updated',
      type: PhotoModel,
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
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosPatchUpdatePhotoSoft() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary:
        'Update photo. (UpdatePhoto permission required. AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiBody({ type: UpdatePhotoArgs })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Photo Updated',
      type: UpdateResultModel,
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
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}

export function ApiPhotosDeletePhoto() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary:
        'Delete photo. (DeletePhoto permission required. AccessToken required)',
    })(target, propertyKey, descriptor);
    ApiParam({
      name: 'id',
      type: 'number',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Photo deleted',
      type: PhotoModel,
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
      status: 429,
      description: 'ThrottlerException: Too Many Requests',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}
