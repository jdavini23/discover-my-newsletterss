"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNewslettersTable1702938756000 = void 0;
class CreateNewslettersTable1702938756000 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS newsletters`);
    }
}
exports.CreateNewslettersTable1702938756000 = CreateNewslettersTable1702938756000;
