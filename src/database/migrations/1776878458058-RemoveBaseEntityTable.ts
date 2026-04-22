import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBaseEntityTable1776878458058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "base_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
