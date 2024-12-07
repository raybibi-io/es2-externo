import GatewayService, {
  CartaoDeCredito,
} from 'src/pagamentos/domain/gateway.service';

export default class PagseguroGatewayService implements GatewayService {
  async validarCartaoDeCredito(
    cartaoDeCredito: CartaoDeCredito,
  ): Promise<boolean> {
    const exp = cartaoDeCredito.cvv.split('/');
    const requestBody = {
      reference_id: 'ex-00001',
      description: 'Motivo do pagamento',
      amount: {
        value: 0.1,
        currency: 'BRL',
      },
      payment_method: {
        type: 'CREDIT_CARD',
        installments: 1,
        capture: false,
        card: {
          number: cartaoDeCredito.numero,
          exp_month: exp[0],
          exp_year: exp[1],
          security_code: cartaoDeCredito.cvv,
          holder: {
            name: cartaoDeCredito.nomeTitular,
          },
        },
      },
    };

    return false;
  }

  realizarPagamento(cartaoDeCredito: CartaoDeCredito): Promise<boolean> {}
}
