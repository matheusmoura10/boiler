import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {injectable} from "inversify";

@Entity({
    name: 'log_model'
})
@injectable()
export class LogModel {
    @PrimaryGeneratedColumn(
        'uuid',
    )
    declare id: string;

    @Column('enum', {name: 'tipo', enum: ['TYPEORM', 'AUDITORIA'], nullable: false})
    declare tipo: string;

    @Column('datetime', {name: 'data', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    declare data: Date;

    @Column('varchar', {length: 255, name: 'auditoria_id', nullable: false})
    declare auditoria_id: string;

    @Column('varchar', {length: 255, name: 'acao', nullable: false})
    declare acao: string;

    @Column('varchar', {length: 255, name: 'tabela', nullable: false})
    declare tabela: string;

    @Column('json', {name: 'colunas', nullable: true})
    declare colunas: any;

    @Column('json', {name: 'valores_alterados', nullable: true})
    declare valores_alterados: any;

    @Column('varchar', {length: 255, name: 'usuario', nullable: false})
    declare usuario: string;
}