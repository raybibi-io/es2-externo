import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerServiceImpl } from './infra/external/mailer-service-impl';

@Module({
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: 'MailerService',
      useClass: MailerServiceImpl,
    },
  ],
})
export default class EmailModule {}
