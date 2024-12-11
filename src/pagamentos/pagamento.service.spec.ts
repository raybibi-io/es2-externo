import { Test, TestingModule } from '@nestjs/testing';
import PagamentoService from './pagamento.service';
import { CobrancaStatus } from './domain/cobranca';
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

  describe('create', () => {
    it('create a new payment', async () => {
      const paymentData: CreateCobrancaDto = {
        valor: 100,
        method: 'credit_card',
        status: CobrancaStatus.PENDENTE,
      };

      mockPagamentoRepository.create.mockResolvedValue({
        id: 1,
        ...paymentData,
      });

      const result = await pagamentoService.create(paymentData);

      expect(mockPagamentoRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(paymentData),
      );
      expect(result).toBeInstanceOf(Pagamento);
      expect(result).toHaveProperty('id', 1);
    });
  });

  describe('delete', () => {
    it('should delete a payment if it exists', async () => {
      mockPagamentoRepository.findById.mockResolvedValue({
        id: 1,
        status: CobrancaStatus.PAGA,
      });
      mockPagamentoRepository.delete.mockResolvedValue(undefined);

      await pagamentoService.delete(1);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPagamentoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if payment does not exist', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.delete(1)).rejects.toThrow(
        'Cobrança não encontrada',
      );
    });
  });

  describe('update', () => {
    it('should update payment details if payment exists', async () => {
      const payment = {
        id: 1,
        amount: 100,
        method: 'cartao-de-credito',
        status: CobrancaStatus.PENDENTE,
      };
      const updatedData = { amount: 150, status: CobrancaStatus.PAGA };

      mockPagamentoRepository.findById.mockResolvedValue(payment);
      mockPagamentoRepository.update.mockResolvedValue({
        ...payment,
        ...updatedData,
      });

      const result = await pagamentoService.update(1, updatedData);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(mockPagamentoRepository.update).toHaveBeenCalledWith(
        1,
        updatedData,
      );
      expect(result).toHaveProperty('amount', 150);
      expect(result).toHaveProperty('status', CobrancaStatus.PAGA);
    });

    it('should throw an error if payment does not exist', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.update(1, { amount: 150 })).rejects.toThrow(
        'Payment not found',
      );
    });
  });

  describe('findAll', () => {
    it('should return all payments', async () => {
      const payments = [
        {
          id: 1,
          amount: 100,
          method: 'cartao-de-credito',
          status: CobrancaStatus.PAGA,
        },
        {
          id: 2,
          amount: 200,
          method: 'paypal',
          status: CobrancaStatus.PENDENTE,
        },
      ];

      mockPagamentoRepository.findAll.mockResolvedValue(payments);

      const result = await pagamentoService.findAll();

      expect(mockPagamentoRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(payments);
    });
  });

  describe('findById', () => {
    it('should return a payment by ID', async () => {
      const payment = {
        valor: 100,
        method: 'cartao-de-credito',
        status: CobrancaStatus.PAGA,
      };

      mockPagamentoRepository.findById.mockResolvedValue(payment);

      const result = await pagamentoService.findById(1);

      expect(mockPagamentoRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(payment);
    });

    it('should throw an error if payment is not found', async () => {
      mockPagamentoRepository.findById.mockResolvedValue(null);

      await expect(pagamentoService.findById(1)).rejects.toThrow(
        'Payment not found',
      );
    });
  });
});
