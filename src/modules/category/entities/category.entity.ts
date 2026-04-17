import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/modules/bases/base.entity';
import { Transactions } from 'src/modules/transactions/entities/transactions.entity';
@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @OneToMany(() => Transactions, (transactions) => transactions.category)
  transactions!: Transactions[];
}
