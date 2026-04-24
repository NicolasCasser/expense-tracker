import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../bases/entities/base.entity';
import { Category } from '../../category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity() 
@ObjectType()
export class Transaction extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
amount!: number;

  @Column()
  date!: Date;

  @Column()
  description!: string;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category!: Category;
}
