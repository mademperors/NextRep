import { MigrationInterface, QueryRunner } from "typeorm";

export class Docker1749935348490 implements MigrationInterface {
    name = 'Docker1749935348490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."account_accounttype_enum" AS ENUM('member', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."account_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."account_goal_enum" AS ENUM('lose_weight', 'gain_muscle', 'maintain_fitness')`);
        await queryRunner.query(`CREATE TABLE "account" ("username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "accountType" "public"."account_accounttype_enum" NOT NULL, "weight" numeric(4,1), "height" integer, "gender" "public"."account_gender_enum", "age" integer, "goal" "public"."account_goal_enum", "additionalInfo" text, CONSTRAINT "PK_41dfcb70af895ddf9a53094515b" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a70cfe460b309351f8903e8e8" ON "account" ("accountType") `);
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "trainingInfo" text NOT NULL, "creator" character varying(50) NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."challenge_challengetype_enum" AS ENUM('global', 'group', 'private')`);
        await queryRunner.query(`CREATE TYPE "public"."challenge_status_enum" AS ENUM('enrollment', 'started', 'ended')`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "challengeInfo" text NOT NULL, "challengeType" "public"."challenge_challengetype_enum" NOT NULL, "duration" integer NOT NULL, "currentDay" integer NOT NULL DEFAULT '0', "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."challenge_status_enum" NOT NULL DEFAULT 'enrollment', "creator" character varying(50) NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_challenge" ("accountUsername" character varying NOT NULL, "challengeId" integer NOT NULL, "completedDays" boolean array NOT NULL DEFAULT ARRAY[]::BOOLEAN[], CONSTRAINT "PK_443c510abe39049042bf584cca7" PRIMARY KEY ("accountUsername", "challengeId"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("achievement_id" SERIAL NOT NULL, "achievement_info" text NOT NULL, CONSTRAINT "PK_5cbaff867128cd6996d6aee95b1" PRIMARY KEY ("achievement_id"))`);
        await queryRunner.query(`CREATE TABLE "account_achivements_achievement" ("accountUsername" character varying(50) NOT NULL, "achievementAchievementId" integer NOT NULL, CONSTRAINT "PK_caaf8702431de87f92bd441aa00" PRIMARY KEY ("accountUsername", "achievementAchievementId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1427bd97715d03867b194c438" ON "account_achivements_achievement" ("accountUsername") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb64f5d2a414a4bd156ef7b95a" ON "account_achivements_achievement" ("achievementAchievementId") `);
        await queryRunner.query(`CREATE TABLE "account_friends_account" ("accountUsername_1" character varying(50) NOT NULL, "accountUsername_2" character varying(50) NOT NULL, CONSTRAINT "PK_d003d03d32d87eec4d6cfd1b121" PRIMARY KEY ("accountUsername_1", "accountUsername_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9a89aef40de7375386e29956f8" ON "account_friends_account" ("accountUsername_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e4f8f15d4a5941a15bd33056b" ON "account_friends_account" ("accountUsername_2") `);
        await queryRunner.query(`CREATE TABLE "challenge_trainings" ("challengeId" integer NOT NULL, "trainingId" integer NOT NULL, CONSTRAINT "PK_5217e5275ce5573ecb8ab90d0e4" PRIMARY KEY ("challengeId", "trainingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4cde5a01293979de9e33e41583" ON "challenge_trainings" ("challengeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_877436c0cd224d9f113b5cd262" ON "challenge_trainings" ("trainingId") `);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "account"("username") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ADD CONSTRAINT "FK_b75c36c39df45797906411b80f2" FOREIGN KEY ("accountUsername") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ADD CONSTRAINT "FK_15ff63fdc81e39f6835311bf315" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_achivements_achievement" ADD CONSTRAINT "FK_f1427bd97715d03867b194c438d" FOREIGN KEY ("accountUsername") REFERENCES "account"("username") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "account_achivements_achievement" ADD CONSTRAINT "FK_fb64f5d2a414a4bd156ef7b95ad" FOREIGN KEY ("achievementAchievementId") REFERENCES "achievement"("achievement_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "account_friends_account" ADD CONSTRAINT "FK_9a89aef40de7375386e29956f8d" FOREIGN KEY ("accountUsername_1") REFERENCES "account"("username") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "account_friends_account" ADD CONSTRAINT "FK_4e4f8f15d4a5941a15bd33056b6" FOREIGN KEY ("accountUsername_2") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_4cde5a01293979de9e33e41583c" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_877436c0cd224d9f113b5cd2620" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_877436c0cd224d9f113b5cd2620"`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_4cde5a01293979de9e33e41583c"`);
        await queryRunner.query(`ALTER TABLE "account_friends_account" DROP CONSTRAINT "FK_4e4f8f15d4a5941a15bd33056b6"`);
        await queryRunner.query(`ALTER TABLE "account_friends_account" DROP CONSTRAINT "FK_9a89aef40de7375386e29956f8d"`);
        await queryRunner.query(`ALTER TABLE "account_achivements_achievement" DROP CONSTRAINT "FK_fb64f5d2a414a4bd156ef7b95ad"`);
        await queryRunner.query(`ALTER TABLE "account_achivements_achievement" DROP CONSTRAINT "FK_f1427bd97715d03867b194c438d"`);
        await queryRunner.query(`ALTER TABLE "account_challenge" DROP CONSTRAINT "FK_15ff63fdc81e39f6835311bf315"`);
        await queryRunner.query(`ALTER TABLE "account_challenge" DROP CONSTRAINT "FK_b75c36c39df45797906411b80f2"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_877436c0cd224d9f113b5cd262"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4cde5a01293979de9e33e41583"`);
        await queryRunner.query(`DROP TABLE "challenge_trainings"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e4f8f15d4a5941a15bd33056b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a89aef40de7375386e29956f8"`);
        await queryRunner.query(`DROP TABLE "account_friends_account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb64f5d2a414a4bd156ef7b95a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1427bd97715d03867b194c438"`);
        await queryRunner.query(`DROP TABLE "account_achivements_achievement"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "account_challenge"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TYPE "public"."challenge_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."challenge_challengetype_enum"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a70cfe460b309351f8903e8e8"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TYPE "public"."account_goal_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."account_accounttype_enum"`);
    }

}
