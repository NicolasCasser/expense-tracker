import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { dataSourceOptions } from './database/data-source';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configura o TypeORM de forma assíncrona para esperar o .env carregar
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // O Code-First gera o schema automaticamente com base no código
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
    }),
    TransactionsModule,
  ],
})
export class AppModule {}
