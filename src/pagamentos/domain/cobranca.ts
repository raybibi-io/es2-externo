import { CobrancaEntity } from './cobranca.entity';

export enum CobrancaStatus {
  PENDENTE = 'PENDENTE',
  PAGA = 'PAGA',
  CANCELADA = 'CANCELADA',
}

export default class Cobranca {
  id: number;
  status: CobrancaStatus;
  horaSolicitacao: string;
  horaFinalizacao: string;
  valor: number;
  ciclista: number;

  static toDomain(cobrancaEntity: CobrancaEntity) {
    const cobranca = new Cobranca();

    cobranca.id = cobrancaEntity.id;
    cobranca.status = cobrancaEntity.status;
    cobranca.valor = cobrancaEntity.valor;
    cobranca.horaFinalizacao = cobrancaEntity.horaFinalizacao.toISOString();
    cobranca.horaSolicitacao = cobrancaEntity.horaSolicitacao.toISOString();
    cobranca.ciclista = cobrancaEntity.ciclistaId;
  }
}
