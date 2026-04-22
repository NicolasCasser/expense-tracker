# 💰 Expense Tracker

API GraphQL para gerenciamento de despesas, construída com **NestJS**, **GraphQL Apollo Server**, **TypeORM** e **PostgreSQL**.

---

## 📋 Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Node.js** 18+ (opcional, se rodar localmente sem Docker)
- **npm** ou **yarn**

---

## 🚀 Guia Rápido de Início

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd expense-tracker
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado nos exemplos fornecidos:

```bash
# Copie o arquivo de exemplo para desenvolvimento
cp env.example .env
```


### 3. Iniciar o projeto com Docker

```bash
docker-compose up -d
```

Este comando irá:

- Criar e iniciar o container do PostgreSQL
- Criar e iniciar o container da API (porta 3000)
- Montar volumes para desenvolvimento em tempo real

### 4. Rodar as migrações do banco de dados

```bash
docker exec expense_tracker_api npm run migration:run
```

Pronto! Acesse a API em `http://localhost:3000/graphql`

---

## 📦 Comandos Principais

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar o projeto em modo de desenvolvimento (watch mode)
npm run start:dev

# Build do projeto
npm build

# Linting e formatação
npm run lint
npm run format
```

### Banco de Dados - Migrações

#### Gerar uma nova migração

Após fazer alterações nas entidades (por ex: criar um novo campo), gere uma migração:

```bash
docker exec expense_tracker_api npm run migration:generate -- src/database/migrations/NomeDaMigracao
```

#### Executar migrações pendentes

```bash
docker exec expense_tracker_api npm run migration:run
```

#### Reverter última migração

```bash
docker exec expense_tracker_api npm run typeorm -- migration:revert -d ./src/database/data-source.ts
```

### Testes

```bash
# Testes unitários
npm run test

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e

# Testes em modo watch
npm run test:watch
```

---

## 🗂️ Estrutura do Projeto

```
src/
├── main.ts                    # Ponto de entrada da aplicação
├── app.module.ts              # Módulo raiz
├── schema.gql                 # Schema GraphQL gerado automaticamente
├── database/
│   ├── data-source.ts         # Configuração do TypeORM
│   └── migrations/            # Arquivos de migração
│       ├── 1776871510141-InitialSchema.ts
│       └── 1776878458058-RemoveBaseEntityTable.ts
└── modules/
    ├── category/              # Módulo de Categorias
    │   ├── entities/
    │   ├── dto/
    │   ├── category.service.ts
    │   ├── category.resolver.ts
    │   └── category.module.ts
    ├── transactions/          # Módulo de Transações
    │   ├── entities/
    │   ├── dto/
    │   ├── transactions.service.ts
    │   ├── transactions.resolver.ts
    │   └── transactions.module.ts
    └── bases/                 # Entidades base
        └── entities/
            └── base.entity.ts
```

---

## 📡 GraphQL - Endpoints Principais

Acesse o Apollo Studio em: **http://localhost:3000/graphql**

### Exemplos de Queries

#### Listar categorias

```graphql
query {
  categories {
    id
    name
    description
  }
}
```

#### Listar transações

```graphql
query {
  transactions {
    id
    description
    amount
    category {
      name
    }
  }
}
```

---

## 🐳 Docker - Comandos Úteis

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs da API
docker logs -f expense_tracker_api

# Ver logs do banco de dados
docker logs -f expense_tracker_db

# Acessar terminal do container da API
docker exec -it expense_tracker_api bash

# Acessar psql do banco de dados
docker exec -it expense_tracker_db psql -U postgres -d expense_tracker_db
```

---

## 📝 Notas Importantes

- As migrações são executadas automaticamente na ordem cronológica
- O arquivo `schema.gql` é gerado automaticamente pelo NestJS
- O projeto usa class-validator para validação de DTOs

---

## � Stack Tecnológico

| Tecnologia    | Versão    | Descrição                   |
| ------------- | --------- | --------------------------- |
| NestJS        | ^11.0.1   | Framework backend principal |
| GraphQL       | ^16.13.2  | API Query Language          |
| Apollo Server | ^5.5.0    | Servidor GraphQL            |
| TypeORM       | ^0.3.28   | ORM para banco de dados     |
| PostgreSQL    | 17-alpine | Banco de dados principal    |
| TypeScript    | Últimas   | Linguagem de programação    |

---