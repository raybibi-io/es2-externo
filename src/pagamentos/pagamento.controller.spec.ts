import { Test, TestingModule } from '@nestjs/testing';
import PagamentoService from './pagamento.service';
import { CreateCobranca } from './domain/cobranca.repository';
import ValidaCartaoDeCreditoDto from './dto/valida-cartao-de-credito.dto';
import { CobrancaStatus } from './domain/cobranca';
import { CobrancaEntity } from './domain/cobranca.entity';
import PagamentoController from './pagamento.controller';

describe('PagamentoController', () => {
  let pagamentoController: PagamentoController;

  const mockPagamentoService = {
    createCobranca: jest.fn(),
    getCobranca: jest.fn(),
    validarCartaoDeCredito: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [
        {
          provide: PagamentoService,
          useValue: mockPagamentoService,
        },
      ],
    }).compile();

    pagamentoController = module.get<PagamentoController>(PagamentoController);
  });

  describe('createCobranca', () => {
    it('should create a cobranca', async () => {
      const createCobrancaDto: CreateCobranca = {
        ciclista: 1,
        valor: 20,
      };
      const result: CobrancaEntity = {
        ...createCobrancaDto,
        id: 1,
        status: CobrancaStatus.PENDENTE,
        horaSolicitacao: new Date(),
        horaFinalizacao: new Date(),
      };

      mockPagamentoService.createCobranca.mockResolvedValue(result);

      await expect(
        pagamentoController.createCobranca(createCobrancaDto),
      ).resolves.toBe(result);
      expect(mockPagamentoService.createCobranca).toHaveBeenCalledWith(
        createCobrancaDto,
      );
    });
  });

  describe('getCobranca', () => {
    it('should return a cobranca by id', async () => {
      const idCobranca = 1;
      const result = {
        id: idCobranca,
        status: CobrancaStatus.PENDENTE,
        horaSolicitacao: new Date(),
        horaFinalizacao: new Date(),
        valor: 100,
        ciclista: 1,
      };

      mockPagamentoService.getCobranca.mockResolvedValue(result);
      expect(await pagamentoController.getCobranca(idCobranca)).toBe(result);
      expect(mockPagamentoService.getCobranca).toHaveBeenCalledWith(idCobranca);
    });
  });

  describe('validaCartaoDeCredito', () => {
    it('should validate the credit card', async () => {
      const validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto = {
        cvv: '123',
        nomeTitular: 'João',
        numero: '1234123412341234',
        validade: '11/26',
      };

      mockPagamentoService.validarCartaoDeCredito.mockResolvedValue(undefined);

      await expect(
        pagamentoController.validaCartaoDeCredito(validaCartaoDeCreditoDto),
      ).resolves.toBeUndefined();
      expect(mockPagamentoService.validarCartaoDeCredito).toHaveBeenCalledWith(
        validaCartaoDeCreditoDto,
      );
    });
  });
});
