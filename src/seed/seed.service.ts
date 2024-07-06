import { Injectable, Logger } from '@nestjs/common';
import { UserWithRelationsService } from './userWithRelations/userWithRelations.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userWithRelationsService: UserWithRelationsService,
  ) {}

  async seed(count: number) {
    return await Promise.all(await this.userWithRelationsService.seed(count)) // Add all seeds
      .then((createdEntities) => {
        this.logger.debug('Successfully completed seeding entities...');
        // Remove all null values and return only created entity.
        const noNullCreatedEntities = createdEntities.filter(
          (nullValueOrCreatedEntity) => nullValueOrCreatedEntity,
        );
        this.logger.debug(
          'Number of entities created : ' +
            // Remove all null values and return only created entity.
            noNullCreatedEntities.length,
        );
        return Promise.resolve(noNullCreatedEntities);
      })
      .catch((error) => {
        this.logger.error('Failed seeding entities...');
        Promise.reject(error);
      });
  }
}
