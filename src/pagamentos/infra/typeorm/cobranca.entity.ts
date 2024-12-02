import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cobrancas')
export class CobrancaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @Column()
  horaSolicitacao: Date;
  @Column()
  horaFinalizacao: Date;
  @Column()
  valor: number;
  @Column()
  ciclista_id: number;
}
