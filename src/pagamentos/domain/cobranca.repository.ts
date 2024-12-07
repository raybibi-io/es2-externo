import Cobranca from './cobranca';

export type CreateCobranca = {
  valor: number;
  ciclista: number;
};

export interface CobrancaRepository {
  save(cobranca: CreateCobranca): Promise<Cobranca>;
  findById(id: number): Promise<Cobranca>;
}
