export type CartaoDeCredito = {
  numero: string;
  validade: string;
  nomeTitular: string;
  cvv: string;
};

export default interface GatewayService {
  validarCartaoDeCredito(cartaoDeCredito: CartaoDeCredito): Promise<boolean>;
  realizarPagamento(cartaoDeCredito: CartaoDeCredito): Promise<boolean>;
}
