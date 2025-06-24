import { MigrationInterface, QueryRunner } from "typeorm";

export class FriendRequest1750598861308 implements MigrationInterface {
    name = 'FriendRequest1750598861308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]::BOOLEAN[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_challenge" ALTER COLUMN "completedDays" SET DEFAULT ARRAY[]`);
    }

}
