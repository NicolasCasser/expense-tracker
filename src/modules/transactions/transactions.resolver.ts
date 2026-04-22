import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class TransactionsResolver {
  @Query(() => String)
  pingTransactions(): string {
    return 'Módulo de transações conectado com sucesso!';
  }
}