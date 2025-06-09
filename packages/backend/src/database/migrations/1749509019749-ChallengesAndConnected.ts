import { MigrationInterface, QueryRunner } from "typeorm";

export class ChallengesAndConnected1749509019749 implements MigrationInterface {
    name = 'ChallengesAndConnected1749509019749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."challenge_challenge_type_enum" AS ENUM('global', 'group', 'private')`);
        await queryRunner.query(`CREATE TABLE "challenge" ("id" SERIAL NOT NULL, "duration" integer NOT NULL, "challenge_info" text NOT NULL, "challenge_type" "public"."challenge_challenge_type_enum" NOT NULL, "creator" character varying NOT NULL, CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_challenge" ("creator_email" character varying NOT NULL, "challenge_id" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_e1facd807152f4573e7c7ff954e" PRIMARY KEY ("creator_email", "challenge_id"))`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_98101294ad5a0877149d1342cf2" FOREIGN KEY ("creator_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_98101294ad5a0877149d1342cf2"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`DROP TABLE "member_challenge"`);
        await queryRunner.query(`DROP TABLE "challenge"`);
        await queryRunner.query(`DROP TYPE "public"."challenge_challenge_type_enum"`);
    }

}
