import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationCreratedByInChallenge1749294241595 implements MigrationInterface {
    name = 'AddRelationCreratedByInChallenge1749294241595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" ADD "createdByEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_f9234a71cf6635525316736c7f7" FOREIGN KEY ("createdByEmail") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_f9234a71cf6635525316736c7f7"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "createdByEmail"`);
    }

}
