import { CobrancaStatus } from './cobranca';
import { CobrancaEntity } from './cobranca.entity';

export type CreateCobranca = {
  status: CobrancaStatus;
  valor: number;
  ciclista: number;
};

export interface CobrancaRepository {
  save(cobranca: CreateCobranca): Promise<CobrancaEntity>;
  findById(id: number): Promise<CobrancaEntity>;
  getCobrancasPendentes(): Promise<CobrancaEntity[]>;
}
