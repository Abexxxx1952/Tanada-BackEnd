import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationParamsArgs } from '../../types/paginationParams';
import { FindAllPhotosWithConditionsDto } from '../../types/findWithConditions';

export class FindPhotosWithStringConditionWithPaginationParams
  implements PaginationParamsArgs
{
  @ApiProperty()
  condition: FindAllPhotosWithConditionsDto;

  @ApiPropertyOptional({ example: 1 })
  offset?: number;

  @ApiPropertyOptional({ example: 10 })
  limit?: number;
}
