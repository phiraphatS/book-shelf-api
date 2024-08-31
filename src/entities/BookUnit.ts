import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookBorrowing } from "./BookBorrowing";
import { Book } from "./Book";

@Index("book_unit_pkey", ["id"], { unique: true })
@Entity("book_unit", { schema: "public" })
export class BookUnit {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "status", nullable: true, length: 20 })
  status: string | null;

  @Column("character varying", {
    name: "condition",
    nullable: true,
    length: 20,
  })
  condition: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.bookUnit)
  bookBorrowings: BookBorrowing[];

  @ManyToOne(() => Book, (book) => book.bookUnits)
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;
}
