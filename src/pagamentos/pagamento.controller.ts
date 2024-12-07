import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import PagamentoService from './pagamento.service';
import { CreateCobranca } from './domain/cobranca.repository';
import ValidaCartaoDeCreditoDto from './dto/valida-cartao-de-credito.dto';

@Controller()
export default class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('cobranca')
  async createCobranca(@Body() createCobrancadto: CreateCobranca) {
    return this.pagamentoService.createCobranca(createCobrancadto);
  }
  @Get('cobranca/:idCobranca')
  async getCobranca(@Param('idCobranca', ParseIntPipe) idCobranca: number) {
    return this.pagamentoService.getCobranca(idCobranca);
  }

  @Post('/validaCartaoDeCredito')
  async validaCartaoDeCredito(
    @Body() validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto,
  ) {
    return this.pagamentoService.validarCartaoDeCredito(
      validaCartaoDeCreditoDto,
    );
  }
}
