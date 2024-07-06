import { ApiPropertyOptional } from '@nestjs/swagger';
import { PhotoEntity } from '../../../domain/photo/entity/photo.entity';
import { FindUserByConditionsDto } from '../../../domain/user/dto/findByConditions.dto';
import { PhotoModel } from '../../photo/types/photo';
export class FindUserByConditionsArgs implements FindUserByConditionsDto {
  @ApiPropertyOptional({ type: 'string', format: 'UUID' })
  readonly id?: string;

  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional({ type: 'string', format: 'email' })
  readonly email?: string;

  @ApiPropertyOptional()
  readonly icon?: string;

  @ApiPropertyOptional()
  readonly createdAt?: Date;

  @ApiPropertyOptional()
  readonly updatedAt?: Date;

  @ApiPropertyOptional({ type: () => PhotoModel })
  readonly photo?: PhotoEntity[];
}
