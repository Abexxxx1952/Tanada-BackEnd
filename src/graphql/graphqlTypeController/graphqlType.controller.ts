import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ApiGraphQlTypesGet } from '../../swagger/graphqlTypes';
import { GraphqlTypeService } from './graphqlType.service';

@ApiTags('graphqltypes')
@Controller('graphqltypes')
export class GraphqlTypesController {
  constructor(private readonly graphqlTypeService: GraphqlTypeService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiGraphQlTypesGet()
  downloadTypes(@Res() res: Response) {
    return this.graphqlTypeService.downloadTypes(res);
  }

  downloadTypesAsUrl(): string {
    return this.graphqlTypeService.downloadTypesAsUrl();
  }
}
