import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727453747095 implements MigrationInterface {
  name = 'Migrations1727453747095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photo" ADD "sortId" integer NOT NULL DEFAULT 1`,
    );

    await queryRunner.query(`
            WITH ranked_photos AS (
                SELECT
                    id,
                    ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY id) AS sortId
                FROM
                    "photo"
            )
            UPDATE "photo"
            SET "sortId" = ranked_photos.sortId
            FROM ranked_photos
            WHERE "photo".id = ranked_photos.id
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "sortId"`);
  }
}
