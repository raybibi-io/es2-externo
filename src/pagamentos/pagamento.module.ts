import { Module } from '@nestjs/common';
import PagamentoService from './pagamento.service';
import PagamentoController from './pagamento.controller';
import { DataSource } from 'typeorm';
import { TypeormCobrancaRepository } from './infra/typeorm/typeorm-cobranca-repository';
import { TypeormCobrancaEntity } from './infra/typeorm/typeorm-cobranca.entity';

@Module({
  providers: [
    PagamentoService,
    {
      provide: 'CobrancaRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormCobrancaRepository(
          dataSource.getRepository(TypeormCobrancaEntity),
        );
      },
      inject: [DataSource],
    },
  ],
  controllers: [PagamentoController],
})
export default class PagamentoModule {}
