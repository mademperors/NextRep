import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatememberChallengeTableAndConnectMemberAndChallengeToIt1749232023530 implements MigrationInterface {
    name = 'CreatememberChallengeTableAndConnectMemberAndChallengeToIt1749232023530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member_challenge" ("member_email" character varying NOT NULL, "challenge_id" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_dd0639e1d94b49ce923eabce6a8" PRIMARY KEY ("member_email", "challenge_id"))`);
        await queryRunner.query(`CREATE TABLE "challenge" ("challenge_id" SERIAL NOT NULL, "duration" integer NOT NULL, "challenge_info" text NOT NULL, "challenge_type" character varying(50) NOT NULL, "challengeCreatorId" integer, CONSTRAINT "PK_b95f806dea2b83443d86d05d1db" PRIMARY KEY ("challenge_id"))`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_06b2a36f0b059f9c93d2088e98d" FOREIGN KEY ("challengeCreatorId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_06b2a36f0b059f9c93d2088e98d"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TABLE "member_challenge"`);
    }

}
