import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens';
import { JwtPayload } from './types/jwtPayload';
import { UsersRepository } from '../repository/users.repository';
import { ModuleRef } from '@nestjs/core';
import { UserEntity } from '../entity/user.entity';
import { AttachedUser } from './types/attachedUser';
import { AttachedUserWithRt } from './types/attachedUserWithRt';
import { RegistrationSources } from './types/providersOAuth.enum';
import { ParseUserOAuth } from './types/parseUserOAuth';

@Injectable()
export class AuthService {
  private usersRepository: UsersRepository;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    this.usersRepository = this.moduleRef.get('UsersRepository', {
      strict: false,
    });
  }

  async login(
    currentUser: UserEntity,
    response: Response,
  ): Promise<AttachedUser> {
    try {
      const tokens = await this.getTokens(currentUser);
      await this.updateRtHash(currentUser.id, tokens.refresh_token);

      response.cookie('Authentication', tokens, {
        httpOnly: true,
        sameSite: true,
        expires: this.getExpiresTimeRT(),
      });

      return {
        id: currentUser.id,
        email: currentUser.email,
        permissions: currentUser.permissions,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(
    currentUser: AttachedUser,
    response: Response,
  ): Promise<AttachedUser> {
    try {
      await this.usersRepository.updateOneByIdSoft(currentUser.id, {
        hashedRefreshToken: '',
      });

      response.cookie('Authentication', '', {
        httpOnly: true,
        expires: new Date(),
      });

      return currentUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }

  async refreshTokens(
    currentUser: AttachedUserWithRt,
    response: Response,
  ): Promise<string> {
    let userExist: UserEntity;
    try {
      userExist = await this.usersRepository.findOneById(currentUser.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }

    if (!userExist.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(
      currentUser.refreshToken,
      userExist.hashedRefreshToken,
    );

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    try {
      const tokens = await this.getTokens(currentUser);
      await this.updateRtHash(userExist.id, tokens.refresh_token);

      response.cookie('Authentication', tokens, {
        httpOnly: true,
        sameSite: true,
        expires: this.getExpiresTimeRT(),
      });

      return 'Refresh Successful';
    } catch (error) {
      throw error;
    }
  }

  async validateUserLocal(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const userExists = await this.usersRepository.findOneByCondition({
        email: email,
      });

      if (
        !userExists.password ||
        !userExists.registrationSources.includes(RegistrationSources.Local)
      )
        throw new ForbiddenException('Access Denied');

      const passwordMatches = await bcrypt.compare(
        password,
        userExists.password,
      );

      if (!passwordMatches) throw new ForbiddenException('Access Denied');

      return userExists;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException('Access Denied');
      }
      throw error;
    }
  }

  async validateUserOAuth(
    profile: any,
    provider: RegistrationSources,
  ): Promise<UserEntity> {
    let parseUserOAuth: ParseUserOAuth;

    let existUser: UserEntity;
    switch (provider) {
      case RegistrationSources.Google: {
        parseUserOAuth = this.parseGoogleUser(profile);
        break;
      }
      case RegistrationSources.GitHub: {
        parseUserOAuth = this.parseGitHubUser(profile);
        break;
      }
      default:
        throw new InternalServerErrorException('Invalid provider');
    }

    try {
      existUser = await this.usersRepository.findOneByCondition({
        email: parseUserOAuth.email,
      });
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
    }

    if (!existUser) {
      try {
        existUser = await this.usersRepository.createUserOAuth(parseUserOAuth);
      } catch (error) {
        throw error;
      }
    }

    return existUser;
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    try {
      const hash = await bcrypt.hash(rt, 10);
      await this.usersRepository.updateOneByIdSoft(userId, {
        hashedRefreshToken: hash,
      });
    } catch (error) {
      throw error;
    }
  }
  private async getTokens(
    currentUser: UserEntity | AttachedUserWithRt,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: currentUser.id,
      email: currentUser.email,
      permissions: currentUser.permissions,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
        expiresIn: this.configService.getOrThrow<number>(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        ),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
        expiresIn: this.configService.getOrThrow<number>(
          'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        ),
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private getExpiresTimeRT(): Date {
    const expiresTime = new Date();
    expiresTime.setTime(
      expiresTime.getTime() +
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
    );

    return expiresTime;
  }
  private parseGoogleUser(profile: any): ParseUserOAuth {
    const {
      displayName: name,
      emails: [{ value: email }],
      photos: [{ value: icon }],
    } = profile;

    return {
      name,
      email,
      icon,
      registrationSources: [RegistrationSources.Google],
    };
  }

  private parseGitHubUser(profile: any): ParseUserOAuth {
    const {
      username: name,
      emails: [{ value: email }],
      photos: [{ value: icon }],
    } = profile;

    return {
      name,
      email,
      icon,
      registrationSources: [RegistrationSources.GitHub],
    };
  }
}
