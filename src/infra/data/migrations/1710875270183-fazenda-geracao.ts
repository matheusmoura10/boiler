import { MigrationInterface, QueryRunner } from "typeorm";

export class FazendaGeracao1710875270183 implements MigrationInterface {
    name = 'FazendaGeracao1710875270183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fazenda_geracao\` (\`id\` varchar(36) NOT NULL, \`referencia\` date NOT NULL, \`data_leitura\` date NOT NULL, \`demanda_kwh\` float NOT NULL, \`tarifa_demanda\` float NOT NULL, \`energia_injetada_hfp\` float NOT NULL, \`auto_consumo_hfp\` float NOT NULL, \`saldo_geracao_hfp\` float NOT NULL, \`energia_injetada_hp\` float NOT NULL, \`auto_consumo_hp\` float NOT NULL, \`saldo_geracao_hp\` float NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`fazenda_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fazenda_geracao\` ADD CONSTRAINT \`FK_a6fd90a387d91e81b41aa8a8cc0\` FOREIGN KEY (\`fazenda_id\`) REFERENCES \`fazenda\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fazenda_geracao\` DROP FOREIGN KEY \`FK_a6fd90a387d91e81b41aa8a8cc0\``);
        await queryRunner.query(`DROP TABLE \`fazenda_geracao\``);
    }

}
