import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendRequest21750603761334 implements MigrationInterface {
    name = 'FriendRequest21750603761334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "sender_username" character varying(50) NOT NULL, "receiver_username" character varying(50) NOT NULL, "message" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]::BOOLEAN[]`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_7d291e51954eb41b7ff0f9908e6" FOREIGN KEY ("sender_username") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_fbf143d299e643f5fef1d10fb3d" FOREIGN KEY ("receiver_username") REFERENCES "account"("username") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_fbf143d299e643f5fef1d10fb3d"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_7d291e51954eb41b7ff0f9908e6"`);
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
    }

}
