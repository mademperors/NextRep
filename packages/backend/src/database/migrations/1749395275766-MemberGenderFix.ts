import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberGenderFix1749395275766 implements MigrationInterface {
  name = 'MemberGenderFix1749395275766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "gender"`);
    await queryRunner.query(`CREATE TYPE "public"."member_gender_enum" AS ENUM('male', 'female')`);
    await queryRunner.query(`ALTER TABLE "member" ADD "gender" "public"."member_gender_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."member_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "gender" integer`);
  }
}
