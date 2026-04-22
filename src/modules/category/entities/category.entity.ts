import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../bases/entities/base.entity';
import { Transaction } from '../../transactions/entities/transactions.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @Column()
  name!: string;

  @OneToMany(() => Transaction, (transactions) => transactions.category)
  transactions?: Transaction[];
}
