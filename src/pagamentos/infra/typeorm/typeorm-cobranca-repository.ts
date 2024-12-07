import {
  CobrancaRepository,
  CreateCobranca,
} from 'src/pagamentos/domain/cobranca.repository';
import { TypeormCobrancaEntity } from './typeorm-cobranca.entity';
import { Repository } from 'typeorm';
import { CobrancaEntity } from 'src/pagamentos/domain/cobranca.entity';
import { CobrancaStatus } from 'src/pagamentos/domain/cobranca';

export class TypeormCobrancaRepository implements CobrancaRepository {
  constructor(private ormRepository: Repository<TypeormCobrancaEntity>) {}
  async save(cobranca: CreateCobranca): Promise<CobrancaEntity> {
    const cobrancaEntity = await this.ormRepository.save({
      status: CobrancaStatus.PAGA,
      horaSolicitacao: new Date(),
      horaFinalizacao: new Date(),

      valor: cobranca.valor,
      ciclista: cobranca.ciclista,
    });
    return cobrancaEntity;
  }

  async findById(id: number): Promise<CobrancaEntity> {
    return this.ormRepository.findOne({ where: { id } });
  }
}
