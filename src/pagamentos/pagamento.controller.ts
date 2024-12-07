import { Controller } from '@nestjs/common';
import PagamentoService from './pagamento.service';

@Controller()
export default class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}
}
