import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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

  async loginLocal(
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
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
    }

    if (!userExist || !userExist.hashedRefreshToken)
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
      throw new InternalServerErrorException(error);
    }
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const userExists = await this.usersRepository.findOneByCondition({
      email: email,
    });

    if (!userExists) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(password, userExists.password);

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    return userExists;
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, 10);
    await this.usersRepository.updateOneByIdSoft(userId, {
      hashedRefreshToken: hash,
    });
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
        expiresIn: parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
          10,
        ),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
        expiresIn: parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
          10,
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
}
