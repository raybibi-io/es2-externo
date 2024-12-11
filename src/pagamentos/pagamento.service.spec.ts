import sinon from 'sinon';
import PagamentoService from './pagamento.service';
import { CobrancaRepository } from './domain/cobranca.repository';
import GatewayService from './domain/gateway.service';
import IGatewayService from './domain/gateway.service';
import { AppError, AppErrorType } from 'src/common/domain/app-error';
import ValidaCartaoDeCreditoDto from './dto/valida-cartao-de-credito.dto';

describe('PagamentoService', () => {
  let service: PagamentoService;
  let cobrancaRepository: sinon.SinonStubbedInstance<CobrancaRepository>;
  let gatewayService: sinon.SinonStubbedInstance<IGatewayService>;

  beforeEach(() => {
    cobrancaRepository = sinon.createStubInstance(CobrancaRepository);
    gatewayService = sinon.createStubInstance(GatewayService);
    service = new PagamentoService(cobrancaRepository, gatewayService);
  });

  it('should be defined', () => {
    expect(service).to.not.be.undefined;
  });

  describe('getCobranca', () => {
    it('should return a cobranca if found', async () => {
      const cobranca = { id: 1, amount: 100 };
      cobrancaRepository.findById.resolves(cobranca);

      const result = await service.getCobranca(1);
      expect(result).to.deep.equal(cobranca);
    });

    it('should throw an error if cobranca not found', async () => {
      cobrancaRepository.findById.resolves(null);

      await expect(service.getCobranca(1)).to.be.rejectedWith(
        new AppError(
          'Cobranca não encontrada',
          AppErrorType.RESOURCE_NOT_FOUND,
        ),
      );
    });
  });

  describe('createCobranca', () => {
    it('should create and return a cobranca', async () => {
      const createCobrancaDto = {
        amount: 100,
        valor: 100,
        ciclista: 12345,
      };
      const savedCobranca = { id: 1, amount: 100 };
      cobrancaRepository.save.resolves(savedCobranca);

      const result = await service.createCobranca(createCobrancaDto);
      expect(result).toEqual(savedCobranca);
    });
  });

  describe('validarCartaoDeCredito', () => {
    it('should validate the credit card successfully', async () => {
      const validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto = {
        numero: '1234567890123456',
        validade: '12/23',
        nomeTitular: 'John Doe',
        cvv: '123',
      };
      gatewayService.isCartaoDeCreditoValid.resolves(true);

      await expect(service.validarCartaoDeCredito(validaCartaoDeCreditoDto)).to
        .be.fulfilled;
    });

    it('should throw an error if credit card validation fails', async () => {
      const validaCartaoDeCreditoDto: ValidaCartaoDeCreditoDto = {
        numero: '1234567890123456',
        validade: '12/23',
        nomeTitular: 'John Doe',
        cvv: '123',
      };
      gatewayService.isCartaoDeCreditoValid.resolves(false);

      await expect(
        service.validarCartaoDeCredito(validaCartaoDeCreditoDto),
      ).to.be.rejectedWith('Não foi possível validar cartão de crédito');
    });
  });
});
