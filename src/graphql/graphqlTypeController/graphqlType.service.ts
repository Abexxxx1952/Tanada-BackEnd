import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Response } from 'express';

export class GraphqlTypeService {
  constructor(private readonly configService: ConfigService) {}

  downloadTypes(res: Response) {
    const filePath = join(process.cwd(), 'src', 'graphql', 'index.ts');

    res.download(filePath);
  }

  downloadTypesAsUrl(): string {
    return `${this.configService.getOrThrow<string>(
      'DOMAIN_URL',
    )}:${this.configService.getOrThrow<number>(
      'PORT',
    )}/${this.configService.getOrThrow<string>('PREFIX_URL')}/graphqltypes`;
  }
}
