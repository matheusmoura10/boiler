import { MigrationInterface, QueryRunner } from "typeorm";

export class Teste1710762688617 implements MigrationInterface {
    name = 'Teste1710762688617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fazenda\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`unidade_geradora\` varchar(255) NOT NULL, \`numero_instalacao\` varchar(255) NOT NULL, \`numero_cliente\` varchar(255) NOT NULL, \`nota_servico\` varchar(255) NOT NULL, \`potencia_instalada\` float(10,2) NOT NULL DEFAULT '0.00', \`data_conexao\` date NOT NULL, \`tipo_desvio_cota\` varchar(255) NOT NULL, \`limite_desvio_cota\` float(10,2) NOT NULL DEFAULT '0.00', \`fonte_energia\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`concessionariaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`fazenda\` ADD CONSTRAINT \`FK_4d8cfec6655c80d73653e3d053b\` FOREIGN KEY (\`concessionariaId\`) REFERENCES \`concessionaria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`fazenda\` DROP FOREIGN KEY \`FK_4d8cfec6655c80d73653e3d053b\``);
        await queryRunner.query(`DROP TABLE \`fazenda\``);
    }

}
