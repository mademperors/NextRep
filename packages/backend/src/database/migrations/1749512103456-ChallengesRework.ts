import { MigrationInterface, QueryRunner } from "typeorm";

export class ChallengesRework1749512103456 implements MigrationInterface {
    name = 'ChallengesRework1749512103456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_98101294ad5a0877149d1342cf2"`);
        await queryRunner.query(`CREATE TABLE "trainings" ("challenge_id" integer NOT NULL, "training_id" integer NOT NULL, CONSTRAINT "PK_1c098a8515a3bdcff4b51521540" PRIMARY KEY ("challenge_id", "training_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47e9ff4bf9c217fda151d922ee" ON "trainings" ("challenge_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6dc400f5a65c864b7425d0c269" ON "trainings" ("training_id") `);
        await queryRunner.query(`CREATE TABLE "enrolled" ("challenge_id" integer NOT NULL, "member_email" character varying NOT NULL, CONSTRAINT "PK_f934b8e6924b18b154fdcbac8a2" PRIMARY KEY ("challenge_id", "member_email"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f110e533fcec2a30e7138629da" ON "enrolled" ("challenge_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e174f2621f347e9f9aa2048e1f" ON "enrolled" ("member_email") `);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "PK_e1facd807152f4573e7c7ff954e"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "PK_7a0ae87302ba7c5fa27d9446296" PRIMARY KEY ("challenge_id")`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP COLUMN "creator_email"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD "member_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "PK_7a0ae87302ba7c5fa27d9446296"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "PK_dd0639e1d94b49ce923eabce6a8" PRIMARY KEY ("challenge_id", "member_email")`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD "completed_days" boolean array NOT NULL DEFAULT ARRAY[]::BOOLEAN[]`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "current_day" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565" FOREIGN KEY ("member_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_47e9ff4bf9c217fda151d922ee3" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_6dc400f5a65c864b7425d0c2693" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_f110e533fcec2a30e7138629da4" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_e174f2621f347e9f9aa2048e1ff" FOREIGN KEY ("member_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_e174f2621f347e9f9aa2048e1ff"`);
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_f110e533fcec2a30e7138629da4"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_6dc400f5a65c864b7425d0c2693"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_47e9ff4bf9c217fda151d922ee3"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "current_day"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP COLUMN "completed_days"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "PK_dd0639e1d94b49ce923eabce6a8"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "PK_7a0ae87302ba7c5fa27d9446296" PRIMARY KEY ("challenge_id")`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP COLUMN "member_email"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD "creator_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "PK_7a0ae87302ba7c5fa27d9446296"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "PK_e1facd807152f4573e7c7ff954e" PRIMARY KEY ("creator_email", "challenge_id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e174f2621f347e9f9aa2048e1f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f110e533fcec2a30e7138629da"`);
        await queryRunner.query(`DROP TABLE "enrolled"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6dc400f5a65c864b7425d0c269"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47e9ff4bf9c217fda151d922ee"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_98101294ad5a0877149d1342cf2" FOREIGN KEY ("creator_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
