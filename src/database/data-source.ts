import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ? process.env.DB_HOST : 'locahost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  username: process.env.POSTGRES_USERNAME ? process.env.POSTGRES_USERNAME : 'postgres',
  password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'postgres',
  database: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'expense_tracker_db', 

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;