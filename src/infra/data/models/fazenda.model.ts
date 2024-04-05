import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import {ConcessionariaModel} from './concessionaria.model'
import {injectable} from "inversify";

@Entity({
    name: 'fazenda'
})
@injectable()
export class FazendaModel {
    @PrimaryGeneratedColumn(
        'uuid',
    )
    declare id: string;

    @Column()
    declare nome: string

    @Column('varchar', {length: 255, name: 'unidade_geradora', nullable: false})
    declare unidadeGeradora: string

    @Column('varchar', {length: 255, name: 'numero_instalacao', nullable: false})
    declare numeroInstalacao: string

    @Column('varchar', {length: 255, name: 'numero_cliente', nullable: false})
    declare numeroCliente: string

    @Column('varchar', {length: 255, name: 'nota_servico', nullable: false})
    declare notaServico: string

    @Column({type: 'float', precision: 10, scale: 2, default: 0})
    declare potenciaInstalada: number

    @Column('date', {name: 'data_conexao', nullable: false})
    declare dataConexao: Date

    @Column('varchar', {length: 255, name: 'tipo_desvio_cota', nullable: false})
    declare tipoDesvioCota: string

    @Column({type: 'float', precision: 10, scale: 2, default: 0})
    declare limiteDesvioCota: number

    @Column('varchar', {length: 255, name: 'fonte_energia', nullable: false})
    declare fonteEnergia: string

    @CreateDateColumn({
        name: 'created_at'
    })
    declare createdAt: Date

    @UpdateDateColumn({
        name: 'updated_at'
    })
    declare updatedAt: Date


    @ManyToOne(type => ConcessionariaModel, fazendas => FazendaModel, {
        nullable: false,
        persistence: true
    })
    @JoinColumn({
        name: 'concessionaria_id',
        referencedColumnName: 'id',
    })
    declare concessionaria: ConcessionariaModel


}
