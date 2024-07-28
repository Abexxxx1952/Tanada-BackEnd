import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsArgs } from '../../types/paginationParams';
import { FindAllUsersWithConditionsDto } from '../../types/findWithConditions';

export class FindUserWithStringConditionWithPaginationParams
  implements PaginationParamsArgs
{
  @ApiProperty()
  condition: FindAllUsersWithConditionsDto;

  @ApiPropertyOptional({ example: 1 })
  offset?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
