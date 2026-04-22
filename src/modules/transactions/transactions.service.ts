import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';

export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: CreateTransactionInput): Promise<Transaction> {
    const { categoryId, ...transactionData } = data;

    const newTransaction = this.transactionRepository.create({
      ...transactionData,
      category: { id: categoryId },
      date: new Date(),
    });

    return this.transactionRepository.save(newTransaction);
  }
}
