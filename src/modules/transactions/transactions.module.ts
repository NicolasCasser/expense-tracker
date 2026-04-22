import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver'; 
import { Transaction } from './entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [
    TransactionsService, 
    TransactionsResolver,
  ],
})
export class TransactionsModule {}