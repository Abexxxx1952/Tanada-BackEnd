import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePhotoStatEntity1633000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Переименование столбцов
    await queryRunner.renameColumn('photoStat', 'created', 'createdAt');
    await queryRunner.renameColumn('photoStat', 'deleted', 'deletedAt');

    // Изменение типов данных
    await queryRunner.query(`
            ALTER TABLE "photoStat"
            ALTER COLUMN "createdAt" TYPE TIMESTAMP USING to_timestamp("createdAt"),
            ALTER COLUMN "deletedAt" TYPE TIMESTAMP USING to_timestamp("deletedAt");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат изменений
    await queryRunner.query(`
            ALTER TABLE "photoStat"
            ALTER COLUMN "createdAt" TYPE INTEGER USING extract(epoch from "createdAt"),
            ALTER COLUMN "deletedAt" TYPE INTEGER USING extract(epoch from "deletedAt");
        `);

    await queryRunner.renameColumn('photoStat', 'createdAt', 'created');
    await queryRunner.renameColumn('photoStat', 'deletedAt', 'deleted');
  }
}
