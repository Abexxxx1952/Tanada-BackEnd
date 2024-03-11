import { BadRequestException, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../entity/user.entity';
import { LoginDto } from '../../dto/login.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<UserEntity> {
    const loginDto = plainToClass(LoginDto, { email, password });
    try {
      await validateOrReject(loginDto);
    } catch (errors) {
      throw new BadRequestException(
        errors.map((error: any) => error.toString()),
      );
    }

    return await this.authService.validateUserLocal(email, password);
  }
}
