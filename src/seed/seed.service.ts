import { Injectable, Logger } from '@nestjs/common';
import { UserWithRelationsService } from './userWithRelations/userWithRelations.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userWithRelationsService: UserWithRelationsService,
  ) {}
  async seed(count: number) {
    await this.seeding(count)
      .then((completed) => {
        this.logger.debug('Successfully completed seeding entities...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding entities...');
        Promise.reject(error);
      });
  }
  async seeding(count: number) {
    return await Promise.all(await this.userWithRelationsService.seed(count)) // Add all seeds
      .then((createdEntities) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of entities created : ' +
            // Remove all null values and return only created entity.
            createdEntities.filter(
              (nullValueOrCreatedEntity) => nullValueOrCreatedEntity,
            ).length,
        );
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
