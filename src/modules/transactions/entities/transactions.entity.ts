import { BaseEntity } from '../../bases/base.entity';
import { Category } from '../../category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @Column()
  amount!: number;

  @Column()
  date!: Date;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
