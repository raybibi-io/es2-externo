import { CobrancaEntity } from './cobranca.entity';

export type CreateCobranca = {
  valor: number;
  ciclista: number;
};

export interface CobrancaRepository {
  save(cobranca: CreateCobranca): Promise<CobrancaEntity>;
  findById(id: number): Promise<CobrancaEntity>;
}
