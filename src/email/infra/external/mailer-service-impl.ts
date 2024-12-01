import Email from 'src/email/domain/email';
import { MailerService } from 'src/email/domain/mailer-service';

export class MailerServiceImpl implements MailerService {
  async sendEmail(to: string, subject: string, body: string): Promise<Email> {
    return new Promise((resolve) => {
      const email = new Email();
      email.id = 0;
      email.email = to;
      email.assunto = subject;
      email.mensagem = body;
      resolve(email);
    });
  }
}
