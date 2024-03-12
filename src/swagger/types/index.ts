import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateResult {
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
