import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CreateSignedUploadUrlResult,
  CreateSignedUploadUrlResultData,
} from '../../../domain/photo/types/createSignedUploadUrlResult';
import { CreateSignedUploadUrlDto } from '../../../domain/photo/dto/createSignedUploadUrl.dto';

class CreateSignedUploadUrlResultDataModel
  implements CreateSignedUploadUrlResultData
{
  @ApiPropertyOptional()
  signedUrl: string;

  @ApiPropertyOptional()
  token: string;

  @ApiPropertyOptional()
  path: string;
}

export class CreateSignedUploadUrlResultModel
  implements CreateSignedUploadUrlResult
{
  @ApiProperty({ type: CreateSignedUploadUrlResultDataModel, nullable: true })
  data: CreateSignedUploadUrlResultData | null;

  @ApiProperty({ type: 'Error', nullable: true })
  error: null | Error;
}

export class CreateSignedUploadUrlArgs implements CreateSignedUploadUrlDto {
  @ApiProperty()
  readonly fileName: string;
}
