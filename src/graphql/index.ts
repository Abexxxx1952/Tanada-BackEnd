
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
    sortId?: Nullable<number>;
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
    createdAt?: Nullable<DateTime>;
    viewsCount?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    photoId?: Nullable<number>;
    photo?: Nullable<PhotoGqlInput>;
    views?: Nullable<PhotoViewGqlInput[]>;
}

export class PhotoViewGqlInput {
    id?: Nullable<number>;
    viewedAt?: Nullable<DateTime>;
    photoStatId?: Nullable<number>;
    photoStat?: Nullable<PhotoStatGqlInput>;
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

export class FindStatsByDateGqlInput {
    startDate: DateTime;
    endDate: DateTime;
}

export class FindPhotoByConditionsGqlInput {
    id?: Nullable<number>;
    link?: Nullable<string>;
    sortId?: Nullable<number>;
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
    updatedAt?: Nullable<DateTime>;
    payload?: Nullable<PayloadModel[]>;
    photo?: Nullable<PhotoModel[]>;
    permissions: string[];
    registrationSources: string[];
}

export class PhotoModel {
    id: number;
    link: string;
    sortId: number;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    user: UserModel;
    stats: PhotoStatModel;
}

export class PhotoViewModel {
    id: number;
    viewedAt: number;
    photoStatId: number;
    photoStat: PhotoStatModel;
}

export class PhotoStatModel {
    id: number;
    createdAt: DateTime;
    viewsCount?: Nullable<number>;
    deletedAt?: Nullable<DateTime>;
    photoId?: Nullable<number>;
    photo: PhotoModel;
    views?: Nullable<PhotoViewModel[]>;
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
    abstract getGraphqlType(): string | Promise<string>;

    abstract getUsers(offset?: Nullable<number>, limit?: Nullable<number>): Nullable<UserModel[]> | Promise<Nullable<UserModel[]>>;

    abstract getUserById(id: number): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserOneBy(condition: FindUserByConditionsGqlInput): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUserManyBy(condition: FindUserByConditionsGqlInput, offset?: Nullable<number>, limit?: Nullable<number>): Nullable<UserModel[]> | Promise<Nullable<UserModel[]>>;

    abstract getUserOneWith(condition: FindOneUserWithConditionsGqlInput): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract userStatus(): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract userStatusFromHeaders(): Nullable<UserModel> | Promise<Nullable<UserModel>>;

    abstract getUsersStats(): Nullable<UsersStatsResultModel> | Promise<Nullable<UsersStatsResultModel>>;

    abstract getUsersStatsByDate(condition: FindStatsByDateGqlInput): Nullable<UsersStatsResultModel> | Promise<Nullable<UsersStatsResultModel>>;

    abstract getPhotosStats(): Nullable<PhotosStatsResultModel> | Promise<Nullable<PhotosStatsResultModel>>;

    abstract getPhotosStatsById(id: string): Nullable<PhotosStatsResultModel> | Promise<Nullable<PhotosStatsResultModel>>;

    abstract getPhotosStatsByDate(condition: FindStatsByDateGqlInput): Nullable<PhotosStatsResultModel> | Promise<Nullable<PhotosStatsResultModel>>;

    abstract getPhotosStatsByDateById(id: string, condition: FindStatsByDateGqlInput): Nullable<PhotosStatsResultModel> | Promise<Nullable<PhotosStatsResultModel>>;

    abstract getPhotosStatsForCurrentYearByMonth(): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

    abstract getPhotosStatsForCurrentYearByMonthById(id: string): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

    abstract getPhotosStatsForCurrentMonthByWeek(): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

    abstract getPhotosStatsForCurrentMonthByWeekById(id: string): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

    abstract getPhotosStatsForLast7Days(): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

    abstract getPhotosStatsForLast7DaysById(id: string): Nullable<PhotosStatsResultModel[]> | Promise<Nullable<PhotosStatsResultModel[]>>;

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

    abstract logOutFromHeaders(): AttachedUserModel | Promise<AttachedUserModel>;

    abstract refresh(): string | Promise<string>;

    abstract refreshFromHeaders(): string | Promise<string>;

    abstract updateUser(name?: Nullable<string>, password?: Nullable<string>, icon?: Nullable<string>, payload?: Nullable<PayloadGqlInput[]>): UpdateUserResultModel | Promise<UpdateUserResultModel>;

    abstract updateUserFromHeaders(name?: Nullable<string>, password?: Nullable<string>, icon?: Nullable<string>, payload?: Nullable<PayloadGqlInput[]>): UpdateUserResultModel | Promise<UpdateUserResultModel>;

    abstract deleteUser(): UserModel | Promise<UserModel>;

    abstract deleteUserFromHeaders(): UserModel | Promise<UserModel>;

    abstract addViewsPhotoStats(id: number): PhotoStatModel | Promise<PhotoStatModel>;

    abstract createSignedUploadUrl(fileName: string): CreateSignedUploadUrlResultModel | Promise<CreateSignedUploadUrlResultModel>;

    abstract createSignedUploadUrlFromHeaders(fileName: string): CreateSignedUploadUrlResultModel | Promise<CreateSignedUploadUrlResultModel>;

    abstract createPhoto(link: string): PhotoModel | Promise<PhotoModel>;

    abstract createPhotoFromHeaders(link: string): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoHard(link: string, id: number): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoHardFromHeaders(link: string, id: number): PhotoModel | Promise<PhotoModel>;

    abstract updatePhotoSoft(link: string, id: number): UpdatePhotoResultModel | Promise<UpdatePhotoResultModel>;

    abstract updatePhotoSoftFromHeaders(link: string, id: number): UpdatePhotoResultModel | Promise<UpdatePhotoResultModel>;

    abstract deletePhoto(id: number): PhotoModel | Promise<PhotoModel>;

    abstract deletePhotoFromHeaders(id: number): PhotoModel | Promise<PhotoModel>;
}

export type DateTime = any;
export type JSONObject = any;
type Nullable<T> = T | null;
