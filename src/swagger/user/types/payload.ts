import { ApiProperty } from '@nestjs/swagger';
import { Payload } from '../../../domain/user/types/payload';

export class PayloadModel implements Payload {
  @ApiProperty()
  key: string;
  @ApiProperty()
  value: string;
}
