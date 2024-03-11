import { ApiProperty } from '@nestjs/swagger';
import {
  PermissionEnum,
  PermissionEnumKeys,
} from '../../permission/permission';

export class AttachedUser {
  @ApiProperty({ type: 'string', format: 'UUID' })
  readonly id: string;
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;
  @ApiProperty({
    enum: [PermissionEnum],
  })
  readonly permissions: PermissionEnumKeys[];
}
