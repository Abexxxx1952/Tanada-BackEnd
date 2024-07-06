import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateUserDto } from '../../../domain/user/dto/update.dto';
export class UpdateUserArgs implements UpdateUserDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly password?: string;

  @ApiPropertyOptional()
  readonly icon?: string;

  @ApiPropertyOptional({
    isArray: true,
    type: Object,
  })
  readonly payload?: Record<string, string>[];
}
