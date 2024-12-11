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

@Controller()
export default class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('cobranca')
  async createCobranca(@Body() createCobrancaDto: CreateCobranca) {
    return this.pagamentoService.createCobranca(createCobrancaDto);
  }
  @Get('cobranca/:idCobranca')
  async getCobranca(@Param('idCobranca', ParseIntPipe) idCobranca: number) {
    return this.pagamentoService.getCobranca(idCobranca);
  }
}
