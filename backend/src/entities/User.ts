import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity("User")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart[];

  @OneToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;
}
