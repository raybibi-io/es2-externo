import { CobrancaStatus } from 'src/pagamentos/domain/cobranca';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cobrancas')
export class TypeormCobrancaEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  status: CobrancaStatus;
  @Column()
  horaSolicitacao: Date;
  @Column()
  horaFinalizacao: Date;
  @Column()
  valor: number;
  @Column()
  ciclistaId: number;
}