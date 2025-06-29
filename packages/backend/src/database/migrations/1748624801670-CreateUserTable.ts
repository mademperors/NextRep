import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1748624801670 implements MigrationInterface {
  name = 'CreateUserTable1748624801670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("email" character varying NOT NULL, "password" character varying NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
