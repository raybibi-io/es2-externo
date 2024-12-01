import { EnviarEmailDto } from './dto/enviar-email.dto';

export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarEmail(enviarEmailDto: EnviarEmailDto) {
    const { email, assunto, mensagem } = enviarEmailDto;

    await this.mailerService.sendMail({
      to: email,
      subject: assunto,
      text: mensagem,
    });
  }
}
