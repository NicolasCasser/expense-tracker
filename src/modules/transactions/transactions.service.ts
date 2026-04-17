import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transactions.entity';
import { Repository } from 'typeorm';

export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>,
  ) {}
}
