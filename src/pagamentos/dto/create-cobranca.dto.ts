import { IsNumber } from 'class-validator';

export class CreateCobrancaDto {
  @IsNumber()
  valor: number;
  @IsNumber()
  ciclista: number;
}
