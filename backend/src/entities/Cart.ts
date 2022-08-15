import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (order) => order.id)
  @JoinColumn()
  item: Product;

  @ManyToOne(() => User, (user) => user.username)
  @JoinColumn()
  user: User;
}
