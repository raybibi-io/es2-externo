import Email from 'src/email/domain/email';
import { MailerService } from 'src/email/domain/mailer-service';

export class MailerServiceImpl implements MailerService {
  private emails: Email[];

  constructor() {
    this.emails = [];
  }

  async sendEmail(to: string, subject: string, body: string): Promise<Email> {
    return new Promise((resolve) => {
      const email = new Email();
      email.id = this.emails.length + 1;
      email.email = to;
      email.assunto = subject;
      email.mensagem = body;
      this.emails.push(email);
      resolve(email);
    });
  }
}
