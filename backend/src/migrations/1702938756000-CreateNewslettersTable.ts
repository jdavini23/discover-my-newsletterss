import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateNewslettersTable1702938756000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE newsletters (
                id VARCHAR(36) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                authorName VARCHAR(255),
                url VARCHAR(255) NOT NULL,
                frequency ENUM('daily', 'weekly', 'monthly', 'quarterly') NOT NULL,
                averageRating DECIMAL(3,2) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE INDEX IDX_newsletter_name ON newsletters (name)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS newsletters`);
    }
}
