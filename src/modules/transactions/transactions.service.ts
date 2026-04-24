import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(data: CreateTransactionInput): Promise<Transaction> {
  const transactions = this.transactionRepository.create(data); 

  const savedTransaction = await this.transactionRepository.save(transactions);
  return savedTransaction;
}

async findAll(): Promise<Transaction[]>{ 
  const transaction = await this.transactionRepository.find(); 
if (transaction.length === 0) {
  throw new NotFoundException(' no transaction found');
}
 return transaction; 
}

async findById(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({ id });

    if (!transaction) {
      throw new NotFoundException({ message: 'transaction not found' });
    }

    return transaction;
  }


  async delete(id: string): Promise<string> {
    const result = await this.transactionRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('transaction not found');
    }

    return 'Transaction deleted seccessfully';
  }
}

