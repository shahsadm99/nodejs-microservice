import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OrderLine } from './orderLine.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  orderNumber: string;

  orderLineItemsList: OrderLine[];
}
