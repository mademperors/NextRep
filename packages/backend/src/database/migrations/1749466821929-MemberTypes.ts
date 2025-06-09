import { MigrationInterface, QueryRunner } from 'typeorm';

export class MemberTypes1749466821929 implements MigrationInterface {
  name = 'MemberTypes1749466821929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "weight" numeric(4,1)`);
    await queryRunner.query(
      `ALTER TYPE "public"."member_gender_enum" RENAME TO "member_gender_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."member_gender_enum" AS ENUM('male', 'female', 'other')`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "gender" TYPE "public"."member_gender_enum" USING "gender"::"text"::"public"."member_gender_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."member_gender_enum_old"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "goal"`);
    await queryRunner.query(
      `CREATE TYPE "public"."member_goal_enum" AS ENUM('lose_weight', 'gain_muscle', 'maintain_fitness')`,
    );
    await queryRunner.query(`ALTER TABLE "member" ADD "goal" "public"."member_goal_enum"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "additional_info"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "additional_info" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "additional_info"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "additional_info" character varying`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "goal"`);
    await queryRunner.query(`DROP TYPE "public"."member_goal_enum"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "goal" character varying`);
    await queryRunner.query(
      `CREATE TYPE "public"."member_gender_enum_old" AS ENUM('male', 'female')`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ALTER COLUMN "gender" TYPE "public"."member_gender_enum_old" USING "gender"::"text"::"public"."member_gender_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."member_gender_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."member_gender_enum_old" RENAME TO "member_gender_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "member" ADD "weight" integer`);
  }
}
