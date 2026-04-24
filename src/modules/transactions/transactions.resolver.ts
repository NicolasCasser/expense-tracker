import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Transaction } from "./entities/transactions.entity";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionInput } from "./dto/create-transaction.input";
 
@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionsService) {}

  @Mutation(() => Transaction, { name: 'createTransaction' })
  async create(@Args('data') data: CreateTransactionInput): Promise<Transaction> {
    return this.transactionService.create(data);
  }

    @Query(() => [Transaction], { name: 'findAllTransactions' })
    async findAll(): Promise<Transaction[]> {
      return this.transactionService.findAll();
    }
}