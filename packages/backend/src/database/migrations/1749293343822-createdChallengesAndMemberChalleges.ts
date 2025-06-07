import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedChallengesAndMemberChalleges1749293343822 implements MigrationInterface {
    name = 'CreatedChallengesAndMemberChalleges1749293343822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "challenge" ("challenge_id" SERIAL NOT NULL, "duration" integer NOT NULL, "challenge_info" text NOT NULL, "challenge_type" character varying(50) NOT NULL, CONSTRAINT "PK_b95f806dea2b83443d86d05d1db" PRIMARY KEY ("challenge_id"))`);
        await queryRunner.query(`CREATE TABLE "member_challenge" ("member_email" character varying NOT NULL, "challenge_id" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_dd0639e1d94b49ce923eabce6a8" PRIMARY KEY ("member_email", "challenge_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "member_challenge"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
    }

}
