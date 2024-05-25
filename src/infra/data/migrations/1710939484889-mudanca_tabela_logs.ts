import { MigrationInterface, QueryRunner } from "typeorm";

export class MudancaTabelaLogs1710939484889 implements MigrationInterface {
    name = 'MudancaTabelaLogs1710939484889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`log_model\` (\`id\` varchar(36) NOT NULL, \`tipo\` enum ('TYPEORM', 'AUDITORIA') NOT NULL, \`data\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`auditoria_id\` varchar(255) NOT NULL, \`acao\` varchar(255) NOT NULL, \`tabela\` varchar(255) NOT NULL, \`colunas\` json NULL, \`valores_alterados\` json NULL, \`usuario\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`log_model\``);
    }

}
