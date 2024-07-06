import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateResult } from '../../database/abstractRepository/types/updateResult';

export class UpdateResultModel implements UpdateResult {
  @ApiProperty()
  raw: any;
  @ApiPropertyOptional()
  affected?: number;
  @ApiProperty({
    isArray: true,
    type: Object,
  })
  generatedMaps: {
    [key: string]: any;
  }[];
}
