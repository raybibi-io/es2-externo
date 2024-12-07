import { Module } from '@nestjs/common';
import EmailModule from './email/email.module';
import { DatabaseModule } from './database/database.module';
import PagamentoModule from './pagamentos/pagamento.module';

@Module({
  imports: [DatabaseModule, EmailModule, PagamentoModule],
})
export class AppModule {}
