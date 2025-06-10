import { MigrationInterface, QueryRunner } from "typeorm";

export class Setup1749563693810 implements MigrationInterface {
    name = 'Setup1749563693810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_5e568e001f9d1b91f67815c580f" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "member" ("username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "weight" numeric(4,1), "height" integer, "gender" "public"."member_gender_enum", "age" integer, "goal" "public"."member_goal_enum", "additional_info" text, CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "member_challenge" ("member_username" character varying NOT NULL, "challenge_id" integer NOT NULL, "completed_days" boolean array NOT NULL DEFAULT ARRAY[]::BOOLEAN[], CONSTRAINT "PK_bf63c8c58b0a4a1050d2cc3c9cb" PRIMARY KEY ("member_username", "challenge_id"))`);
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "training_info" text NOT NULL, "creator" character varying(50) NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "challenge_info" text NOT NULL, "challenge_type" "public"."challenge_challenge_type_enum" NOT NULL, "duration" integer NOT NULL, "current_day" integer NOT NULL DEFAULT '1', "creator" character varying(50) NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge_trainings" ("challenge_id" integer NOT NULL, "training_id" integer NOT NULL, CONSTRAINT "PK_6e1771d0b16431468569f1c23c1" PRIMARY KEY ("challenge_id", "training_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bac076129eb6e1f19cf6747a8d" ON "challenge_trainings" ("challenge_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_90cfda88e09c283a6ba82c02f1" ON "challenge_trainings" ("training_id") `);
        await queryRunner.query(`CREATE TABLE "enrolled" ("challenge_id" integer NOT NULL, "member_username" character varying(50) NOT NULL, CONSTRAINT "PK_d732e26ccf77c30f348a0e30f10" PRIMARY KEY ("challenge_id", "member_username"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f110e533fcec2a30e7138629da" ON "enrolled" ("challenge_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44d9b38d3171f78fd243f38c0d" ON "enrolled" ("member_username") `);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_22214fc4a600a36d3e335c65960" FOREIGN KEY ("member_username") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "member"("username") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_bac076129eb6e1f19cf6747a8db" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_90cfda88e09c283a6ba82c02f1f" FOREIGN KEY ("training_id") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_f110e533fcec2a30e7138629da4" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_44d9b38d3171f78fd243f38c0d9" FOREIGN KEY ("member_username") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_44d9b38d3171f78fd243f38c0d9"`);
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_f110e533fcec2a30e7138629da4"`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_90cfda88e09c283a6ba82c02f1f"`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_bac076129eb6e1f19cf6747a8db"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_22214fc4a600a36d3e335c65960"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44d9b38d3171f78fd243f38c0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f110e533fcec2a30e7138629da"`);
        await queryRunner.query(`DROP TABLE "enrolled"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90cfda88e09c283a6ba82c02f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bac076129eb6e1f19cf6747a8d"`);
        await queryRunner.query(`DROP TABLE "challenge_trainings"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TABLE "member_challenge"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
