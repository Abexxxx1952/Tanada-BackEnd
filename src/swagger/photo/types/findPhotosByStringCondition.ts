import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsArgs } from '../../types/paginationParams';
import { FindPhotoByConditionsArgs } from './findPhotoByConditions';

export class FindPhotosByStringConditionWithPaginationParams
  implements PaginationParamsArgs
{
  @ApiProperty()
  condition: FindPhotoByConditionsArgs;

  @ApiPropertyOptional({ example: 1 })
  offset?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
