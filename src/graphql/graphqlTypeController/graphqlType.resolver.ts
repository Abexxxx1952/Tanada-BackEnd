import { Resolver, Query } from '@nestjs/graphql';
import { GraphqlTypeService } from './graphqlType.service';

@Resolver()
export class GraphqlTypeResolver {
  constructor(private readonly graphqlTypeService: GraphqlTypeService) {}

  @Query(() => String, {
    name: 'getGraphqlType',
  })
  downloadTypes(): string {
    const url = this.graphqlTypeService.downloadTypesAsUrl();
    return url;
  }
}
