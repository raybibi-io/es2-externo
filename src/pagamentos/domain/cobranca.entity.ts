import { CobrancaStatus } from './cobranca';

export class CobrancaEntity {
  id: number;
  status: CobrancaStatus;
  horaSolicitacao: Date;
  horaFinalizacao: Date;
  valor: number;
  ciclistaId: number;
}
