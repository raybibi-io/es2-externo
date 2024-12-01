import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EnviarEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  assunto: string;

  @IsString()
  @IsNotEmpty()
  mensagem: string;
}