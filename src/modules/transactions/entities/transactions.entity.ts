import { BaseEntity } from 'src/modules/bases/base.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Column, OneToMany } from 'typeorm';

export class Transactions extends BaseEntity {
  @Column()
  amount!: number;

  @Column()
  date!: Date;

@OneToMany(() => Category, (category) => category.transactions)
  category!: Category[];
}

  

