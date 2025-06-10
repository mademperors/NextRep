import { MigrationInterface, QueryRunner } from "typeorm";

export class MajorChanges1749563329866 implements MigrationInterface {
    name = 'MajorChanges1749563329866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`ALTER TABLE "member" RENAME COLUMN "email" TO "username"`);
        await queryRunner.query(`ALTER TABLE "member" RENAME CONSTRAINT "PK_4678079964ab375b2b31849456c" TO "PK_1945f9202fcfbce1b439b47b77a"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" RENAME COLUMN "member_email" TO "member_username"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" RENAME CONSTRAINT "PK_dd0639e1d94b49ce923eabce6a8" TO "PK_bf63c8c58b0a4a1050d2cc3c9cb"`);
        await queryRunner.query(`CREATE TABLE "enrolled" ("challenge_id" integer NOT NULL, "member_username" character varying(50) NOT NULL, CONSTRAINT "PK_d732e26ccf77c30f348a0e30f10" PRIMARY KEY ("challenge_id", "member_username"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f110e533fcec2a30e7138629da" ON "enrolled" ("challenge_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44d9b38d3171f78fd243f38c0d" ON "enrolled" ("member_username") `);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_de87485f6489f5d0995f5841952"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "PK_e032310bcef831fb83101899b10"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "PK_5e568e001f9d1b91f67815c580f" PRIMARY KEY ("username")`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a" PRIMARY KEY ("username")`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ALTER COLUMN "completed_days" SET DEFAULT ARRAY[]::BOOLEAN[]`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "training" ADD "creator" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "creator" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_22214fc4a600a36d3e335c65960" FOREIGN KEY ("member_username") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "member"("username") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_f110e533fcec2a30e7138629da4" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "enrolled" ADD CONSTRAINT "FK_44d9b38d3171f78fd243f38c0d9" FOREIGN KEY ("member_username") REFERENCES "member"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_44d9b38d3171f78fd243f38c0d9"`);
        await queryRunner.query(`ALTER TABLE "enrolled" DROP CONSTRAINT "FK_f110e533fcec2a30e7138629da4"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" DROP CONSTRAINT "FK_22214fc4a600a36d3e335c65960"`);
        await queryRunner.query(`ALTER TABLE "challenge" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD "creator" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "creator"`);
        await queryRunner.query(`ALTER TABLE "training" ADD "creator" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ALTER COLUMN "completed_days" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a" PRIMARY KEY ("username")`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "PK_5e568e001f9d1b91f67815c580f"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44d9b38d3171f78fd243f38c0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f110e533fcec2a30e7138629da"`);
        await queryRunner.query(`DROP TABLE "enrolled"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" RENAME CONSTRAINT "PK_bf63c8c58b0a4a1050d2cc3c9cb" TO "PK_dd0639e1d94b49ce923eabce6a8"`);
        await queryRunner.query(`ALTER TABLE "member_challenge" RENAME COLUMN "member_username" TO "member_email"`);
        await queryRunner.query(`ALTER TABLE "member" RENAME CONSTRAINT "PK_1945f9202fcfbce1b439b47b77a" TO "PK_4678079964ab375b2b31849456c"`);
        await queryRunner.query(`ALTER TABLE "member" RENAME COLUMN "username" TO "email"`);
        await queryRunner.query(`ALTER TABLE "challenge" ADD CONSTRAINT "FK_ed8efb1168eb2d138bb20b74ceb" FOREIGN KEY ("creator") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_challenge" ADD CONSTRAINT "FK_198d7b7a6ea5881dc6bba897565" FOREIGN KEY ("member_email") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
