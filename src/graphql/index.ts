
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserDirection {
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

export class PhotoInput {
    id?: Nullable<number>;
    link?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    user?: Nullable<UserInput>;
    stats?: Nullable<PhotosStatsInput>;
}

export class UserInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    icon?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    hashedRefreshToken?: Nullable<string>;
    payload?: Nullable<PayloadInput[]>;
    photo?: Nullable<PhotoInput[]>;
    permissions?: Nullable<string[]>;
    registrationSources?: Nullable<string[]>;
}

export class PayloadInput {
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export class PhotosStatsInput {
    id?: Nullable<number>;
    created?: Nullable<number>;
    viewsCount?: Nullable<number>;
    deleted?: Nullable<number>;
    photoId?: Nullable<number>;
    photo?: Nullable<PhotoInput>;
}

export class FindUserByConditionsInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    icon?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    photo?: Nullable<PhotoInput[]>;
}

export class UserOrderObjectInput {
    id?: Nullable<UserDirection>;
    link?: Nullable<UserDirection>;
    createdAt?: Nullable<UserDirection>;
    updatedAt?: Nullable<UserDirection>;
    user?: Nullable<UserDirection>;
}

export class FindPhotoByConditionsInput {
    id?: Nullable<number>;
    link?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    user?: Nullable<UserInput>;
}

export class PhotoOrderObjectInput {
    id?: Nullable<PhotoDirection>;
    link?: Nullable<PhotoDirection>;
    createdAt?: Nullable<PhotoDirection>;
    updatedAt?: Nullable<PhotoDirection>;
    user?: Nullable<PhotoDirection>;
}

export class PhotoStatModel {
    id: number;
    created?: Nullable<number>;
    viewsCount?: Nullable<number>;
    deleted?: Nullable<number>;
    photoId: number;
    photo: PhotoModel;
}

export class PhotoModel {
    id: number;
    link: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    user: UserModel;
    stats: PhotoStatModel;
}

export class PayloadModel {
    key: string;
    value: string;
}

export class UserModel {
    id: string;
    name?: Nullable<string>;
    email: string;
    password?: Nullable<string>;
    icon?: Nullable<string>;
    createdAt: DateTime;
    updatedAt: DateTime;
    hashedRefreshToken?: Nullable<string>;
    payload?: Nullable<PayloadModel[]>;
    photo?: Nullable<PhotoModel[]>;
    permissions: string[];
    registrationSources: string[];
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

    abstract getUserOneBy(id?: Nullable<string>, name?: Nullable<string>, email?: Nullable<string>, icon?: Nullable<string>, createdAt?: Nullable<DateTime>, updatedAt?: Nullable<DateTime>, photo?: Nullable<PhotoInput[]>): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserManyBy(id?: Nullable<string>, name?: Nullable<string>, email?: Nullable<string>, icon?: Nullable<string>, createdAt?: Nullable<DateTime>, updatedAt?: Nullable<DateTime>, photo?: Nullable<PhotoInput[]>, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<UserModel[]> | Promise<Nullable<UserModel[]>>;

    abstract getUserOneWith(where?: Nullable<FindUserByConditionsInput[]>, select?: Nullable<FindUserByConditionsInput>, order?: Nullable<UserOrderObjectInput>, relations?: Nullable<FindUserByConditionsInput>): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserStatus(): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getPhotos(offset?: Nullable<number>, limit?: Nullable<number>): Nullable<PhotoModel[]> | Promise<Nullable<PhotoModel[]>>;

    abstract getPhotoById(id: number): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;

    abstract getPhotoOneBy(id?: Nullable<number>, link?: Nullable<string>, createdAt?: Nullable<DateTime>, updatedAt?: Nullable<DateTime>, user?: Nullable<UserInput>): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;

    abstract getPhotoManyBy(id?: Nullable<number>, link?: Nullable<string>, createdAt?: Nullable<DateTime>, updatedAt?: Nullable<DateTime>, user?: Nullable<UserInput>, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<PhotoModel[]> | Promise<Nullable<PhotoModel[]>>;

    abstract getPhotoOneWith(where?: Nullable<FindPhotoByConditionsInput[]>, select?: Nullable<FindPhotoByConditionsInput>, order?: Nullable<PhotoOrderObjectInput>, relations?: Nullable<FindPhotoByConditionsInput>): Nullable<PhotoModel> | Promise<Nullable<PhotoModel>>;
}

export abstract class IMutation {
    abstract createUser(email: string, password: string, name?: Nullable<string>, icon?: Nullable<string>): UserModel | Promise<UserModel>;

    abstract loginLocal(): AttachedUserModel | Promise<AttachedUserModel>;

    abstract logOut(): AttachedUserModel | Promise<AttachedUserModel>;

    abstract refresh(): string | Promise<string>;

    abstract updateUser(name?: Nullable<string>, password?: Nullable<string>, icon?: Nullable<string>, payload?: Nullable<PayloadInput>): UpdateUserResultModel | Promise<UpdateUserResultModel>;

    abstract deleteUser(): UserModel | Promise<UserModel>;

    abstract createSignedUploadUrl(fileName: string): CreateSignedUploadUrlResultModel | Promise<CreateSignedUploadUrlResultModel>;

    abstract createPhoto(link: string): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoHard(link: string, id: number): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoSoft(link: string, id: number): UpdatePhotoResultModel | Promise<UpdatePhotoResultModel>;

    abstract deletePhoto(id: number): PhotoModel | Promise<PhotoModel>;
}

export type DateTime = any;
export type JSONObject = any;
type Nullable<T> = T | null;
