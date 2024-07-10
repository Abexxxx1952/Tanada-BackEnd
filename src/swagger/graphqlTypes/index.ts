import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGraphQlTypesGet() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    ApiOperation({ summary: 'Get graphQl types' })(
      target,
      propertyKey,
      descriptor,
    );
    ApiResponse({
      status: 200,
      description: 'Got index.ts file',
      content: {
        'application/octet-stream': {
          schema: {
            type: 'string',
            format: 'binary',
            example: `export enum UserDirection {
    ASC = "ASC",
    DESC = "DESC",
    asc = "asc",
    desc = "desc",
    one = "one",
    minusOne = "minusOne"
}

export enum PhotoDirection {
    ASC = "ASC",
    DESC = "DESC",
    asc = "asc",
    desc = "desc",
    one = "one",
    minusOne = "minusOne"
}

export class FindUserByConditionsGqlInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    icon?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    photo?: Nullable<PhotoGqlInput[]>;
}

export class PhotoGqlInput {
    id?: Nullable<number>;
    link?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    user?: Nullable<UserGqlInput>;
    stats?: Nullable<PhotoStatGqlInput>;
}

export class UserGqlInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    icon?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    payload?: Nullable<PayloadGqlInput[]>;
    photo?: Nullable<PhotoGqlInput[]>;
    permissions?: Nullable<string[]>;
    registrationSources?: Nullable<string[]>;
}

export class PayloadGqlInput {
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export class PhotoStatGqlInput {
    id?: Nullable<number>;
    created?: Nullable<number>;
    viewsCount?: Nullable<number>;
    deleted?: Nullable<number>;
    photoId?: Nullable<number>;
    photo?: Nullable<PhotoGqlInput>;
}

export class FindOneUserWithConditionsGqlInput {
    where?: Nullable<FindUserByConditionsGqlInput>;
    select?: Nullable<FindUserByConditionsGqlInput>;
    order?: Nullable<UserOrderObjectGqlInput>;
    relations?: Nullable<FindUserByConditionsGqlInput>;
}

export class UserOrderObjectGqlInput {
    id?: Nullable<UserDirection>;
    link?: Nullable<UserDirection>;
    createdAt?: Nullable<UserDirection>;
    updatedAt?: Nullable<UserDirection>;
    user?: Nullable<UserDirection>;
}

export class FindPhotoByConditionsGqlInput {
    id?: Nullable<number>;
    link?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    user?: Nullable<UserGqlInput>;
}

export class FindOnePhotoWithConditionsGqlInput {
    where?: Nullable<FindPhotoByConditionsGqlInput[]>;
    select?: Nullable<FindPhotoByConditionsGqlInput>;
    order?: Nullable<PhotoOrderObjectGqlInput>;
    relations?: Nullable<FindPhotoByConditionsGqlInput>;
}

export class PhotoOrderObjectGqlInput {
    id?: Nullable<PhotoDirection>;
    link?: Nullable<PhotoDirection>;
    createdAt?: Nullable<PhotoDirection>;
    updatedAt?: Nullable<PhotoDirection>;
    user?: Nullable<PhotoDirection>;
}

export class PayloadModel {
    key: string;
    value: string;
}

export class UserModel {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email: string;
    icon?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
    payload?: Nullable<PayloadModel[]>;
    photo?: Nullable<PhotoModel[]>;
    permissions: string[];
    registrationSources: string[];
}

export class PhotoModel {
    id: number;
    link: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: UserModel;
    stats: PhotoStatModel;
}

export class PhotoStatModel {
    id: number;
    created?: Nullable<number>;
    viewsCount?: Nullable<number>;
    deleted?: Nullable<number>;
    photoId: number;
    photo: PhotoModel;
}

export class UsersStatsResultModel {
    created: number;
    deleted: number;
}

export class PhotosStatsResultModel {
    created: number;
    views: number;
    deleted: number;
}

export class AttachedUserModel {
    id: string;
    email: string;
    permissions: string[];
}

export class UpdateUserResultModel {
    raw: JSONObject[];
    affected?: Nullable<number>;
    generatedMaps: JSONObject[];
}

export class CreateSignedUploadUrlResultData {
    signedUrl: string;
    token: string;
    path: string;
}

export class Error {
    message: string;
}

export class CreateSignedUploadUrlResultModel {
    data?: Nullable<CreateSignedUploadUrlResultData>;
    error?: Nullable<Error>;
}

export class UpdatePhotoResultModel {
    raw: JSONObject[];
    affected?: Nullable<number>;
    generatedMaps: JSONObject[];
}

export abstract class IQuery {
    abstract getUsers(offset?: Nullable<number>, limit?: Nullable<number>): Nullable<UserModel[]> | Promise<Nullable<UserModel[]>>;

    abstract getUserById(id: number): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserOneBy(condition: FindUserByConditionsGqlInput): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserManyBy(condition: FindUserByConditionsGqlInput, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<UserModel[]> | Promise<Nullable<UserModel[]>>;

    abstract getUserOneWith(condition: FindOneUserWithConditionsGqlInput): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract userStatus(): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUsersStats(): Nullable<UsersStatsResultModel> | Promise<Nullable<UsersStatsResultModel>>;

    abstract getPhotosStats(): Nullable<PhotosStatsResultModel> | Promise<Nullable<PhotosStatsResultModel>>;

    abstract getPhotos(offset?: Nullable<number>, limit?: Nullable<number>): Nullable<PhotoModel[]> | Promise<Nullable<PhotoModel[]>>;

    abstract getPhotoById(id: number): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;

    abstract getPhotoOneBy(condition: FindPhotoByConditionsGqlInput): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;

    abstract getPhotoManyBy(condition: FindPhotoByConditionsGqlInput, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<PhotoModel[]> | Promise<Nullable<PhotoModel[]>>;

    abstract getPhotoOneWith(condition: FindOnePhotoWithConditionsGqlInput): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;
}

export abstract class IMutation {
    abstract createUser(email: string, password: string, name?: Nullable<string>, icon?: Nullable<string>): UserModel | Promise<UserModel>;

    abstract loginLocal(email: string, password: string): AttachedUserModel | Promise<AttachedUserModel>;

    abstract logOut(): AttachedUserModel | Promise<AttachedUserModel>;

    abstract refresh(): string | Promise<string>;

    abstract updateUser(name?: Nullable<string>, password?: Nullable<string>, icon?: Nullable<string>, payload?: Nullable<PayloadGqlInput>): UpdateUserResultModel | Promise<UpdateUserResultModel>;

    abstract deleteUser(): UserModel | Promise<UserModel>;

    abstract addViewsPhotoStats(id: number): PhotoStatModel | Promise<PhotoStatModel>;

    abstract createSignedUploadUrl(fileName: string): CreateSignedUploadUrlResultModel | Promise<CreateSignedUploadUrlResultModel>;

    abstract createPhoto(link: string): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoHard(link: string, id: number): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoSoft(link: string, id: number): UpdatePhotoResultModel | Promise<UpdatePhotoResultModel>;

    abstract deletePhoto(id: number): PhotoModel | Promise<PhotoModel>;
}

export type DateTime = any;
export type JSONObject = any;
type Nullable<T> = T | null;

`,
          },
        },
      },
    })(target, propertyKey, descriptor);
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    })(target, propertyKey, descriptor);
  };
}
