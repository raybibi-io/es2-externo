import { IsNotEmpty, IsString } from 'class-validator';

export default class ValidaCartaoDeCreditoDto {
  @IsString()
  @IsNotEmpty()
  nomeTitular: string;
  @IsString()
  @IsNotEmpty()
  numero: string;
  @IsString()
  @IsNotEmpty()
  validade: string;
  @IsString()
  @IsNotEmpty()
  cvv: string;
}
