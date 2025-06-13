import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationForFriends1749573288593 implements MigrationInterface {
    name = 'CreateRelationForFriends1749573288593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member_friends_member" ("memberEmail_1" character varying NOT NULL, "memberEmail_2" character varying NOT NULL, CONSTRAINT "PK_f1b52f463091af7bbcdd6dde795" PRIMARY KEY ("memberEmail_1", "memberEmail_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45a4d7dd9881b5a85bb08027f9" ON "member_friends_member" ("memberEmail_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bc749dfcdcb03fbe998dcaabf" ON "member_friends_member" ("memberEmail_2") `);
        await queryRunner.query(`ALTER TABLE "member_friends_member" ADD CONSTRAINT "FK_45a4d7dd9881b5a85bb08027f94" FOREIGN KEY ("memberEmail_1") REFERENCES "member"("email") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_friends_member" ADD CONSTRAINT "FK_6bc749dfcdcb03fbe998dcaabfa" FOREIGN KEY ("memberEmail_2") REFERENCES "member"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_friends_member" DROP CONSTRAINT "FK_6bc749dfcdcb03fbe998dcaabfa"`);
        await queryRunner.query(`ALTER TABLE "member_friends_member" DROP CONSTRAINT "FK_45a4d7dd9881b5a85bb08027f94"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bc749dfcdcb03fbe998dcaabf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45a4d7dd9881b5a85bb08027f9"`);
        await queryRunner.query(`DROP TABLE "member_friends_member"`);
    }

}
