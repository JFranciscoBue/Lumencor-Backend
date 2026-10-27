import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    default: 'Jorge Vega',
  })
  author: string;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  synopsis: string;

  @Column({
    nullable: false,
  })
  image_Url: string;
}
