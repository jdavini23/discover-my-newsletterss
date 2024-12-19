import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserInterestsTable1702938755000 implements MigrationInterface {
    name = 'AddUserInterestsTable1702938755000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ensure users table exists
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`passwordHash\` varchar(255) NOT NULL,
                \`role\` enum('user', 'admin') NOT NULL DEFAULT 'user',
                \`isEmailVerified\` tinyint NOT NULL DEFAULT 0,
                \`passwordResetToken\` varchar(255) NULL,
                \`passwordResetExpires\` timestamp NULL,
                \`emailVerificationToken\` varchar(255) NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`),
                UNIQUE INDEX \`IDX_user_email\` (\`email\`)
            ) ENGINE=InnoDB
        `);

        // Ensure interests table exists
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`interests\` (
                \`id\` varchar(36) NOT NULL,
                \`name\` varchar(100) NOT NULL,
                \`description\` text NULL,
                \`icon\` varchar(255) NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE INDEX \`IDX_interest_name\` (\`name\`)
            ) ENGINE=InnoDB
        `);

        // Create user_interests join table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`user_interests\` (
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`user_interests\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`interests\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`users\``);
    }
}
