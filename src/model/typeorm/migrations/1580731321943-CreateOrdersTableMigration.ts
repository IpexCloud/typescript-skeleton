import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrdersTableMigration1580731321943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE orders (
        orderId int NOT NULL AUTO_INCREMENT,
        createdAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        userId int NOT NULL,
        PRIMARY KEY (orderId),
        FOREIGN KEY (userId) REFERENCES users(userId)
      )`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE IF EXISTS orders`)
  }
}
