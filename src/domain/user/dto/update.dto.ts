import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDtoLocal } from './createLocal.dto';
export class UpdateUserDto extends OmitType(CreateUserDtoLocal, ['email']) {}
