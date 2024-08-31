import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookUnit } from "./BookUnit";
import { User } from "./User";

@Index("book_borrowing_pkey", ["id"], { unique: true })
@Entity("book_borrowing", { schema: "public" })
export class BookBorrowing {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "borrowed_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  borrowedAt: Date | null;

  @Column("timestamp without time zone", { name: "due_date", nullable: true })
  dueDate: Date | null;

  @Column("timestamp without time zone", {
    name: "returned_at",
    nullable: true,
  })
  returnedAt: Date | null;

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

  @ManyToOne(() => BookUnit, (bookUnit) => bookUnit.bookBorrowings)
  @JoinColumn([{ name: "book_unit_id", referencedColumnName: "id" }])
  bookUnit: BookUnit;

  @ManyToOne(() => User, (user) => user.bookBorrowings)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
