import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  item: string;

  @Column({ nullable: true })
  quantity: number;
}
