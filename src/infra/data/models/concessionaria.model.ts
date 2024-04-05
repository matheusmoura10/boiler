import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { injectable } from "inversify";

@Entity({
  name: "concessionaria",
})
@injectable()
export class ConcessionariaModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column({
    length: 100,
  })
  declare nome: string;

  @Column()
  declare estado: string;

  @CreateDateColumn({
    name: "created_at",
  })
  declare createdAt: Date;
  @UpdateDateColumn({
    name: "updated_at",
  })
  declare updatedAt: Date;
}
