import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { UsersStatsResultModel } from './types/usersStatsResult';
import { PhotosStatsResultModel } from './types/photosStatsResult';
import { PhotoStatModel } from './types/photoStats';

export function ApiStatsGetUsers() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get users stats' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats',
      type: UsersStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'UserStats not found',
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

export function ApiStatsGetUsersByDate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get users stats by date' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats by date',
      type: UsersStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'UserStats not found',
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

export function ApiStatsGetPhotos() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got photos stats',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotoStats not found',
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

export function ApiStatsGetPhotosById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats by id' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiParam({
      name: 'id',
      type: 'string',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got photos stats by id',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotoStats not found',
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

export function ApiStatsPostAddPhotoView() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Add photo view' })(
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
      status: 201,
      description: 'Added photo view',
      type: PhotoStatModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotoStats not found',
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

export function ApiStatsGetPhotosByDate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats by date' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats by date',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosByDateById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats by date by id' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiParam({
      name: 'id',
      type: 'string',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got users stats by date by id',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForCurrentYearByMonth() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats by current year by month' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats by current year by month',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForCurrentYearByMonthById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: 'Get photos stats by current year by month by id',
    })(target, propertyKey, descriptor);
    ApiParam({
      name: 'id',
      type: 'string',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got users stats by current year by month by id',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForCurrentMonthByWeek() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats by current month by week' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats by current month by week',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForCurrentMonthByWeekById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: 'Get photos stats by current month by week by id',
    })(target, propertyKey, descriptor);
    ApiParam({
      name: 'id',
      type: 'string',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got users stats by current month by week by id',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForLast7Days() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get photos stats for last 7 days' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got users stats for last 7 days',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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

export function ApiStatsGetPhotosForLast7DaysById() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({
      summary: 'Get photos stats for last 7 days by id',
    })(target, propertyKey, descriptor);
    ApiParam({
      name: 'id',
      type: 'string',
      example: '22',
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 200,
      description: 'Got users stats for last 7 days by id',
      type: PhotosStatsResultModel,
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 404,
      description: 'PhotosStats not found',
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
