import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMemberColumnsAndEmailPK1749393683967 implements MigrationInterface {
  name = 'AddMemberColumnsAndEmailPK1749393683967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "weight" integer`);
    await queryRunner.query(`ALTER TABLE "member" ADD "height" integer`);
    await queryRunner.query(`ALTER TABLE "member" ADD "gender" integer`);
    await queryRunner.query(`ALTER TABLE "member" ADD "age" integer`);
    await queryRunner.query(`ALTER TABLE "member" ADD "goal" character varying`);
    await queryRunner.query(`ALTER TABLE "member" ADD "additional_info" character varying`);
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
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "additional_info"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "goal"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
  }
}
