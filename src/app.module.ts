import { Module } from '@nestjs/common';
import EmailModule from './email/email.module';
import { DatabaseModule } from './database/database.module';
import PagamentoModule from './pagamentos/pagamento.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import secretManagerConfig from './common/secret-manager.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [secretManagerConfig] }),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '0586f1b8e0cd7d',
          pass: 'b5d327d3b0203a',
        },
      },
    }),
    DatabaseModule,
    EmailModule,
    PagamentoModule,
  ],
})
export class AppModule {}
