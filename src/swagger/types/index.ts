import { ApiProperty } from '@nestjs/swagger';
import { AttachedUser } from 'src/domain/user/auth/types/attachedUser';
import { PermissionEnumKeys } from 'src/domain/user/permission/permission';
export class AttachedUserClass implements AttachedUser {
  @ApiProperty({ type: 'string', format: 'UUID' })
  id: string;
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;
  @ApiProperty()
  permissions: PermissionEnumKeys[];
}

export class LoginBody {
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
}
