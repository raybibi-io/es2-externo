import { Module } from '@nestjs/common';
import EmailModule from './email/email.module';
import { DatabaseModule } from './database/database.module';
import PagamentoModule from './pagamentos/pagamento.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EmailModule,
    PagamentoModule,
  ],
})
export class AppModule {}
