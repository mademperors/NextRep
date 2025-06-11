import { MigrationInterface, QueryRunner } from "typeorm";

export class InheritanceChanges1749596957037 implements MigrationInterface {
    name = 'InheritanceChanges1749596957037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "accountType" "public"."account_accounttype_enum" NOT NULL, "weight" numeric(4,1), "height" integer, "gender" "public"."account_gender_enum", "age" integer, "goal" "public"."account_goal_enum", "additionalInfo" text, CONSTRAINT "PK_41dfcb70af895ddf9a53094515b" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a70cfe460b309351f8903e8e8" ON "account" ("accountType") `);
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "trainingInfo" text NOT NULL, "creator" character varying(50) NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "challengeInfo" text NOT NULL, "challengeType" "public"."challenge_challengetype_enum" NOT NULL, "duration" integer NOT NULL, "currentDay" integer NOT NULL DEFAULT '1', "creator" character varying(50) NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_challenge" ("accountUsername" character varying NOT NULL, "challengeId" integer NOT NULL, "completedDays" boolean array NOT NULL DEFAULT ARRAY[]::BOOLEAN[], CONSTRAINT "PK_443c510abe39049042bf584cca7" PRIMARY KEY ("accountUsername", "challengeId"))`);
        await queryRunner.query(`CREATE TABLE "challenge_trainings" ("challengeId" integer NOT NULL, "trainingId" integer NOT NULL, CONSTRAINT "PK_5217e5275ce5573ecb8ab90d0e4" PRIMARY KEY ("challengeId", "trainingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4cde5a01293979de9e33e41583" ON "challenge_trainings" ("challengeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_877436c0cd224d9f113b5cd262" ON "challenge_trainings" ("trainingId") `);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "account"("username") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ADD CONSTRAINT "FK_b75c36c39df45797906411b80f2" FOREIGN KEY ("accountUsername") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ADD CONSTRAINT "FK_15ff63fdc81e39f6835311bf315" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_4cde5a01293979de9e33e41583c" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" ADD CONSTRAINT "FK_877436c0cd224d9f113b5cd2620" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_877436c0cd224d9f113b5cd2620"`);
        await queryRunner.query(`ALTER TABLE "challenge_trainings" DROP CONSTRAINT "FK_4cde5a01293979de9e33e41583c"`);
        await queryRunner.query(`ALTER TABLE "account_challenge" DROP CONSTRAINT "FK_15ff63fdc81e39f6835311bf315"`);
        await queryRunner.query(`ALTER TABLE "account_challenge" DROP CONSTRAINT "FK_b75c36c39df45797906411b80f2"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_877436c0cd224d9f113b5cd262"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4cde5a01293979de9e33e41583"`);
        await queryRunner.query(`DROP TABLE "challenge_trainings"`);
        await queryRunner.query(`DROP TABLE "account_challenge"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a70cfe460b309351f8903e8e8"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
