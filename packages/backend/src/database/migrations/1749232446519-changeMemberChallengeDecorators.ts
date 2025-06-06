import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeMemberChallengeDecorators1749232446519 implements MigrationInterface {
    name = 'ChangeMemberChallengeDecorators1749232446519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565" FOREIGN KEY ("member_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("challenge_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_7a0ae87302ba7c5fa27d9446296"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565"`);
    }

}
