import { Inject } from '@nestjs/common';
import { MailerService } from './domain/mailer-service';
import { EnviarEmailDto } from './dto/enviar-email.dto';

export class EmailService {
  constructor(
    @Inject('MailerService') private readonly mailerService: MailerService,
  ) {}

  async enviarEmail(enviarEmailDto: EnviarEmailDto) {
    const { email, assunto, mensagem } = enviarEmailDto;
    return this.mailerService.sendEmail(email, assunto, mensagem);
  }
}
