import { MigrationInterface, QueryRunner } from "typeorm";

export class TrainingAndMember1749498576613 implements MigrationInterface {
    name = 'TrainingAndMember1749498576613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "training" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "training_info" text NOT NULL, "creator" character varying NOT NULL, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "weight" numeric(4,1)`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "gender" "public"."member_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "goal"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "goal" "public"."member_goal_enum"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "additional_info"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "additional_info" text`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_5fedba624e16f89e58e6a91f344" FOREIGN KEY ("creator") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_5fedba624e16f89e58e6a91f344"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "additional_info"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "additional_info" character varying`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "goal"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "goal" character varying`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "gender" integer`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "member" ADD "weight" integer`);
        await queryRunner.query(`DROP TABLE "training"`);
    }

}
