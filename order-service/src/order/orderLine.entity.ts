import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
