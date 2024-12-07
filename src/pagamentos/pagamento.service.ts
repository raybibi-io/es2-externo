import { Inject, Injectable } from '@nestjs/common';
import {
  CobrancaRepository,
  CreateCobranca,
} from './domain/cobranca.repository';
import { CobrancaEntity } from './domain/cobranca.entity';

@Injectable()
export default class PagamentoService {
  async getCobranca(idCobranca: number) {
    const cobranca = await this.cobrancaRepository.findById(idCobranca);
    if (!cobranca) {
      throw new Error('Cobranca não encontrada');
    }
    return CobrancaEntity.toDomain(cobranca);
  }
  constructor(
    @Inject('CobrancaRepository')
    private readonly cobrancaRepository: CobrancaRepository,
  ) {}
  async createCobranca(createCobrancaDto: CreateCobranca) {
    const cobranca = await this.cobrancaRepository.save(createCobrancaDto);
    return CobrancaEntity.toDomain(cobranca);
  }
}
