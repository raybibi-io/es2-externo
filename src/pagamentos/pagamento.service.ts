import { Inject, Injectable } from '@nestjs/common';
import {
  CobrancaRepository,
  CreateCobranca,
} from './domain/cobranca.repository';
import { CobrancaEntity } from './domain/cobranca.entity';
import ValidaCartaoDeCreditoDto from './dto/valida-cartao-de-credito.dto';
import GatewayService from './domain/gateway.service';
import { AppError, AppErrorType } from 'src/common/domain/app-error';

@Injectable()
export default class PagamentoService {
  constructor(
    @Inject('CobrancaRepository')
    private readonly cobrancaRepository: CobrancaRepository,
    @Inject('GatewayService')
    private readonly gatewayService: GatewayService,
  ) {}

  async getCobranca(idCobranca: number) {
    const cobranca = await this.cobrancaRepository.findById(idCobranca);
    if (!cobranca) {
      throw new AppError(
        'Cobranca não encontrada',
        AppErrorType.RESOURCE_NOT_FOUND,
      );
    }
    return CobrancaEntity.toDomain(cobranca);
  }

  async createCobranca(createCobrancaDto: CreateCobranca) {
    const cobranca = await this.cobrancaRepository.save(createCobrancaDto);
    return CobrancaEntity.toDomain(cobranca);
  }

  async validarCartaoDeCredito(
    validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto,
  ) {
    const validationResult = await this.gatewayService.isCartaoDeCreditoValido(
      validaCartaoDeCreditoDto,
    );

    if (!validationResult) {
      throw new Error('Não foi possível validar cartão de crédito');
    }
  }
}
