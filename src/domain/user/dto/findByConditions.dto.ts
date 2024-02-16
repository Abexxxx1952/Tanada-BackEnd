import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDtoLocal } from './createLocal.dto';

export class FindByConditionsDto extends PartialType(
  OmitType(CreateUserDtoLocal, ['password']),
) {}
