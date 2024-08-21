import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlTypeResolver } from './graphqlType.resolver';
import { GraphqlTypesController } from './graphqlType.controller';
import { GraphqlTypeService } from './graphqlType.service';

@Module({
  imports: [ConfigModule],
  controllers: [GraphqlTypesController],
  providers: [GraphqlTypeService, GraphqlTypeResolver],
})
export class GraphqlTypesModule {}
