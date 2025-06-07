import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminTableAdded1749206587392 implements MigrationInterface {
    name = 'AdminTableAdded1749206587392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("email" character varying NOT NULL, "password" character varying(100) NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
