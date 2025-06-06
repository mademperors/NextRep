import { MigrationInterface, QueryRunner } from "typeorm";

export class MovedId1749215339558 implements MigrationInterface {
    name = 'MovedId1749215339558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "member_id_seq" OWNED BY "member"."id"`);
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "id" SET DEFAULT nextval('"member_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "member_id_seq"`);
    }

}
