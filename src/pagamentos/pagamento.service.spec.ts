import { Test, TestingModule } from '@nestjs/testing';
import PagamentoService from './pagamento.service';
import Cobranca, { CobrancaStatus } from './domain/cobranca';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';

const mockPagamentoRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
};

describe('PagamentoService', () => {
  let pagamentoService: PagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoService,
        { provide: 'PagamentoRepository', useValue: mockPagamentoRepository },
      ],
    }).compile();

    pagamentoService = module.get<PagamentoService>(PagamentoService);
  });

  describe('criar', () => {
    it('deve criar um novo pagamento', async () => {
      const dadosPagamento: CreateCobrancaDto = {
        valor: 100,
        ciclista: 1,
      };

      mockPagamentoRepository.create.mockResolvedValue({
        id: 1,
        ...dadosPagamento,
      });

      const resultado = pagamentoService.create(dadosPagamento);

      expect(mockPagamentoRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dadosPagamento),
      );
      expect(resultado).toBeInstanceOf(Cobranca);
      expect(resultado).toHaveProperty('id', 1);
    });
  });

  describe('deletar', () => {
    it('deve deletar um pagamento se existir', async () => {
      mockPagamentoRepository.findById.mockResolvedValue({
        id: 1,
        status: CobrancaStatus.PAGA,
      });
      mockPagamentoRepository.delete.mockResolvedValue(undefined);

      await pagamentoService.delete(1);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPagamentoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('deve lançar um erro se o pagamento não existir', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.delete(1)).rejects.toThrow(
        'Cobrança não encontrada',
      );
    });
  });

  describe('atualizar', () => {
    it('deve atualizar os detalhes do pagamento se ele existir', async () => {
      const pagamento = {
        id: 1,
        valor: 100,
        metodo: 'cartao_de_credito',
        status: CobrancaStatus.PENDENTE,
      };
      const dadosAtualizados = { amount: 150 };

      mockPagamentoRepository.findById.mockResolvedValue(pagamento);
      mockPagamentoRepository.update.mockResolvedValue({
        ...pagamento,
        ...dadosAtualizados,
        status: CobrancaStatus.PAGA,
      });

      const resultado = await pagamentoService.update(1, dadosAtualizados);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPagamentoRepository.update).toHaveBeenCalledWith(
        1,
        dadosAtualizados,
      );
      expect(resultado).toHaveProperty('valor', 150);
      expect(resultado).toHaveProperty('status', CobrancaStatus.PAGA);
    });

    it('deve lançar um erro se o pagamento não existir', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.update(1, { valor: 150 })).rejects.toThrow(
        'Pagamento não encontrado',
      );
    });
  });

  describe('encontrarTodos', () => {
    it('deve retornar todos os pagamentos', async () => {
      const pagamentos = [
        {
          id: 1,
          valor: 100,
          metodo: 'cartao_de_credito',
          status: CobrancaStatus.PAGA,
        },
        {
          id: 2,
          valor: 200,
          metodo: 'paypal',
          status: CobrancaStatus.PENDENTE,
        },
      ];

      mockPagamentoRepository.findAll.mockResolvedValue(pagamentos);

      const resultado = await pagamentoService.findAll();

      expect(mockPagamentoRepository.findAll).toHaveBeenCalled();
      expect(resultado).toEqual(pagamentos);
    });
  });

  describe('encontrarPorId', () => {
    it('deve retornar um pagamento pelo ID', async () => {
      const pagamento = {
        valor: 100,
        metodo: 'cartao_de_credito',
        status: CobrancaStatus.PAGA,
      };

      mockPagamentoRepository.findById.mockResolvedValue(pagamento);

      const resultado = await pagamentoService.findById(1);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(pagamento);
    });

    it('deve lançar um erro se o pagamento não for encontrado', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.findById(1)).rejects.toThrow(
        'Pagamento não encontrado',
      );
    });
  });
});
