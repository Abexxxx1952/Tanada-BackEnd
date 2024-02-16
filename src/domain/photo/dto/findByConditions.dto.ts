import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create.dto';

export class FindByConditionsDto extends PartialType(CreatePhotoDto) {}
