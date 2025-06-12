import { MigrationInterface, QueryRunner } from "typeorm";

export class SchedulerChanges1749610291007 implements MigrationInterface {
    name = 'SchedulerChanges1749610291007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" ADD "startDate" date NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."challenge_status_enum" AS ENUM('enrollment', 'started', 'ended')`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "status" "public"."challenge_status_enum" NOT NULL DEFAULT 'enrollment'`);
        await queryRunner.query(`ALTER TABLE "challenge" ALTER COLUMN "currentDay" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]::BOOLEAN[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "challenge" ALTER COLUMN "currentDay" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."challenge_status_enum"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "startDate"`);
    }

}
