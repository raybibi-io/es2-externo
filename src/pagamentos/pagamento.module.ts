import { Module } from '@nestjs/common';
import PagamentoService from './pagamento.service';
import PagamentoController from './pagamento.controller';
import { DataSource } from 'typeorm';
import { TypeormCobrancaRepository } from './infra/typeorm/typeorm-cobranca-repository';
import { TypeormCobrancaEntity } from './infra/typeorm/typeorm-cobranca.entity';
import PagseguroGatewayService from './infra/pagseguro/pagseguro-gateway.service';
import axios, { AxiosInstance } from 'axios';
import { CartaoDeCreditoService } from 'src/common/utils/cartao-de-credito.service';

@Module({
  providers: [
    PagamentoService,
    CartaoDeCreditoService,
    {
      provide: 'CobrancaRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormCobrancaRepository(
          dataSource.getRepository(TypeormCobrancaEntity),
        );
      },
      inject: [DataSource],
    },
    {
      provide: 'AxiosClient',
      useFactory: () => {
        return axios.create({
          baseURL: 'https://sandbox.api.pagseguro.com',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'f246cc1e-ff4e-48d6-a228-7e389a0b77f4f116e5324fde943f75cb97e73031227388ff-e543-4a79-b4ab-8b1fbd179bf2',
          },
        });
      },
    },
    {
      provide: 'GatewayService',
      useFactory: (axiosClient: AxiosInstance) => {
        return new PagseguroGatewayService(axiosClient);
      },
      inject: ['AxiosClient'],
    },
  ],
  controllers: [PagamentoController],
})
export default class PagamentoModule {}
