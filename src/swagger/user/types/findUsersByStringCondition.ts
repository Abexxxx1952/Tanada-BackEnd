import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FindUserByConditionsArgs } from './findUserByConditions';
import { PaginationParamsArgs } from '../../types/paginationParams';

export class FindUsersByStringConditionWithPaginationParams
  implements PaginationParamsArgs
{
  @ApiProperty()
  condition: FindUserByConditionsArgs;

  @ApiPropertyOptional({ example: 1 })
  offset?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
