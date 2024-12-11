import { Module } from '@nestjs/common';
import PagamentoService from './pagamento.service';
import PagamentoController from './pagamento.controller';
import { DataSource } from 'typeorm';
import { TypeormCobrancaRepository } from './infra/typeorm/typeorm-cobranca-repository';
import { TypeormCobrancaEntity } from './infra/typeorm/typeorm-cobranca.entity';
import PagseguroGatewayService from './infra/pagseguro/pagseguro-gateway.service';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

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
    {
      provide: 'AxiosClient',
      useFactory: (configService: ConfigService) => {
        return axios.create({
          baseURL: 'https://sandbox.api.pagseguro.com',
          headers: {
            'Content-Type': 'application/json',
            Authorization: configService.get('PAGSEGURO_AUTHORIZATION'),
          },
        });
      },
      inject: [ConfigService],
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
