export class CartaoDeCreditoService {
  getCartaoDeCredito(idCiclista: number) {
    console.log(idCiclista);
    return {
      nomeTitular: 'Jose da Silva',
      numero: '372938001199778',
      cvv: '1234',
      validade: '03/2026',
    };
  }
}
