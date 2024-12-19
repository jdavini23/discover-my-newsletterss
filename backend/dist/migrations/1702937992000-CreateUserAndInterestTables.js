"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserAndInterestTables1702937992000 = void 0;
class CreateUserAndInterestTables1702937992000 {
    constructor() {
        this.name = 'CreateUserAndInterestTables1702937992000';
    }
    async up(queryRunner) {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`passwordHash\` varchar(255) NOT NULL,
                \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user',
                \`isEmailVerified\` tinyint NOT NULL DEFAULT 0,
                \`passwordResetToken\` varchar(255) NULL,
                \`passwordResetExpires\` timestamp NULL,
                \`emailVerificationToken\` varchar(255) NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE INDEX \`IDX_97672ac88f5fcbe72a9dc13510\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
        // Create interests table
        await queryRunner.query(`
            CREATE TABLE \`interests\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`description\` text NULL,
                \`icon\` varchar(255) NULL,
                UNIQUE INDEX \`IDX_8c9920b5fb32c3cc8362d9d1a0\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
        // Create user_interests join table
        await queryRunner.query(`
            CREATE TABLE \`user_interests\` (
                \`userId\` varchar(36) NOT NULL,
                \`interestId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`userId\`, \`interestId\`),
                INDEX \`IDX_user_interests_user_id\` (\`userId\`),
                INDEX \`IDX_user_interests_interest_id\` (\`interestId\`),
                FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (\`interestId\`) REFERENCES \`interests\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB
        `);
    }
    async down(queryRunner) {
        // Drop tables in reverse order of creation
        await queryRunner.query(`DROP TABLE IF EXISTS \`user_interests\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`interests\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`users\``);
    }
}
exports.CreateUserAndInterestTables1702937992000 = CreateUserAndInterestTables1702937992000;
