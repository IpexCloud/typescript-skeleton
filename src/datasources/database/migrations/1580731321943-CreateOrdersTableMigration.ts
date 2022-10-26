import { MigrationInterface, QueryRunner } from 'typeorm'

class CreateOrdersTableMigration1580731321943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE orders (
        orderId int NOT NULL AUTO_INCREMENT,
        createdAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        userId int NOT NULL,
        PRIMARY KEY (orderId),
        FOREIGN KEY (userId) REFERENCES users(userId)
      )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS orders')
  }
}

export { CreateOrdersTableMigration1580731321943 }
