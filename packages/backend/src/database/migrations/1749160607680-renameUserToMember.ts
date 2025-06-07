import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserToMember1749160607680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "member"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" RENAME TO "user"`);
  }
}
