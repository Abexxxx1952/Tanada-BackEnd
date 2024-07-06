import { ApiProperty } from '@nestjs/swagger';
import { UsersStatsResult } from '../../../domain/stat/types/usersStatsResult';

export class UsersStatsResultModel implements UsersStatsResult {
  @ApiProperty()
  created: number;
  @ApiProperty()
  deleted: number;
}
