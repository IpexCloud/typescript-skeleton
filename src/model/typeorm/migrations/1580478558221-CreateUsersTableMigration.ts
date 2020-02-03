import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTableMigration1580478558221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE users (
        userId int,
        lastName varchar(255),
        firstName varchar(255),
        address varchar(255),
        city varchar(255),
        PRIMARY KEY (userId)
    )`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE users`)
  }
}
