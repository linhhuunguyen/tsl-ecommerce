import {
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (item) => item.id)
  items: Product[];

  @OneToOne(() => User, (user) => user.username)
  @JoinColumn()
  user: User;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
