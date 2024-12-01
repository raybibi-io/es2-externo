import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnviarEmailDto } from './dto/enviar-email.dto';
import { EmailService } from './email.service';

@Controller('enviarEmail')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async enviarEmail(@Body() enviarEmailDto: EnviarEmailDto) {
    return this.emailService.enviarEmail(enviarEmailDto);
  }
}
