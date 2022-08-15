import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  TreeChildren,
  TreeParent,
  Tree,
} from "typeorm";

@Entity("category")
@Tree("nested-set")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  childCategory: Category[];

  @TreeParent()
  parentCategory: Category;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
