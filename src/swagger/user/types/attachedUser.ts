import { ApiProperty } from '@nestjs/swagger';
import {
  UserPermissions,
  UserPermissionsKeys,
} from '../../../domain/user/permission/permission';
import { AttachedUser } from '../../../domain/user/auth/types/attachedUser';

export class AttachedUserModel implements AttachedUser {
  @ApiProperty({ type: 'string', format: 'UUID' })
  readonly id: string;
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: string;
  @ApiProperty({
    enum: [UserPermissions],
  })
  readonly permissions: UserPermissionsKeys[];
}
