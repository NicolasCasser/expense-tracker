import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../bases/base.entity';
import { Transaction } from '../../transactions/entities/transactions.entity';
@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Transaction, (transactions) => transactions.category)
  transactions!: Transaction[];
}
