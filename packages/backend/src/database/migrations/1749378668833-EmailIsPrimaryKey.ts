import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailIsPrimaryKey1749378668833 implements MigrationInterface {
  name = 'EmailIsPrimaryKey1749378668833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "PK_4678079964ab375b2b31849456c" PRIMARY KEY ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "PK_4678079964ab375b2b31849456c"`,
    );
    await queryRunner.query(`ALTER TABLE "member" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
  }
}

