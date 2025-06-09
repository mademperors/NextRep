import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberPasswordOptionsChanged1749206554889 implements MigrationInterface {
  name = 'MemberPasswordOptionsChanged1749206554889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "password" character varying(100) NOT NULL`);
    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "member_id_seq" OWNED BY "member"."id"`);
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "id" SET DEFAULT nextval('"member_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "id" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`,
    );
    await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "member_id_seq"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "password" character varying NOT NULL`);
  }
}
