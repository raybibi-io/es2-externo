import { Test, TestingModule } from '@nestjs/testing';
import PagamentoService from './pagamento.service';
import { CobrancaRepository } from './domain/cobranca.repository';
import { CobrancaEntity } from './domain/cobranca.entity';
import { CobrancaStatus } from './domain/cobranca';
import ValidaCartaoDeCreditoDto from './dto/valida-cartao-de-credito.dto';
import GatewayService from './domain/gateway.service';

describe('PagamentoService', () => {
  let service: PagamentoService;
  let cobrancaRepositoryMock: CobrancaRepository;
  let gatewayServiceMock: GatewayService;

  beforeEach(async () => {
    // Criando mocks para as dependências
    cobrancaRepositoryMock = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as CobrancaRepository;

    gatewayServiceMock = {
      isCartaoDeCreditoValido: jest.fn(),
    } as unknown as GatewayService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoService,
        { provide: 'CobrancaRepository', useValue: cobrancaRepositoryMock },
        { provide: 'GatewayService', useValue: gatewayServiceMock },
      ],
    }).compile();

    service = module.get<PagamentoService>(PagamentoService);
  });

  describe('getCobranca', () => {
    it('deve retornar uma cobrança quando encontrada', async () => {
      const cobrancaEntity: CobrancaEntity = {
        id: 1,
        status: CobrancaStatus.PENDENTE,
        horaSolicitacao: new Date(),
        horaFinalizacao: new Date(),
        valor: 100,
        ciclista: 1,
      };

      const spyFindById = jest
        .spyOn(cobrancaRepositoryMock, 'findById')
        .mockResolvedValue(cobrancaEntity);

      const result = await service.getCobranca(1);

      expect(result).toEqual(CobrancaEntity.toDomain(cobrancaEntity));
      expect(spyFindById).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro quando cobrança não for encontrada', async () => {
      jest.spyOn(cobrancaRepositoryMock, 'findById').mockResolvedValue(null);

      await expect(service.getCobranca(1)).rejects.toThrow(
        'Cobranca não encontrada',
      );
    });
  });

  describe('createCobranca', () => {
    it('deve criar uma nova cobrança', async () => {
      const createCobrancaDto = { valor: 100, ciclista: 1 };
      const cobrancaEntity: CobrancaEntity = {
        id: 1,
        status: CobrancaStatus.PENDENTE,
        horaSolicitacao: new Date(),
        horaFinalizacao: new Date(),
        valor: 100,
        ciclista: 1,
      };

      const spySave = jest
        .spyOn(cobrancaRepositoryMock, 'save')
        .mockResolvedValue(cobrancaEntity);

      const result = await service.createCobranca(createCobrancaDto);

      expect(result).toEqual(CobrancaEntity.toDomain(cobrancaEntity));
      expect(spySave).toHaveBeenCalledWith(createCobrancaDto);
    });
  });

  describe('validarCartaoDeCredito', () => {
    it('deve validar o cartão de crédito com sucesso', async () => {
      const validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };

      const spyIsCartaoDeCreditoValido = jest
        .spyOn(gatewayServiceMock, 'isCartaoDeCreditoValido')
        .mockResolvedValue(true);

      await service.validarCartaoDeCredito(validaCartaoDeCreditoDto);

      expect(spyIsCartaoDeCreditoValido).toHaveBeenCalledWith(
        validaCartaoDeCreditoDto,
      );
    });

    it('deve lançar erro quando a validação do cartão falhar', async () => {
      const validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto = {
        nomeTitular: 'John Doe',
        numero: '1234567890123456',
        validade: '12/24',
        cvv: '123',
      };

      jest
        .spyOn(gatewayServiceMock, 'isCartaoDeCreditoValido')
        .mockResolvedValue(false);

      await expect(
        service.validarCartaoDeCredito(validaCartaoDeCreditoDto),
      ).rejects.toThrow(
        new Error('Não foi possível validar cartão de crédito'),
      );
    });
  });
});
