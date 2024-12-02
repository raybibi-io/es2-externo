export enum CobrancaStatus {
  PENDENTE = 'pendente',
  PAGA = 'paga',
  CANCELADA = 'cancelada',
}

export default class Cobranca {
  id: number;
  status: CobrancaStatus;
  horaSolicitacao: string;
  horaFinalizacao: string;
  valor: string;
  ciclista: string;
}
