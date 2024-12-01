import { EnviarEmailDto } from './dto/enviar-email.dto';
import { EmailService } from './email.service';

export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  async enviarEmail(enviarEmailDto: EnviarEmailDto) {
    return this.emailService.enviarEmail(enviarEmailDto);
  }
}
