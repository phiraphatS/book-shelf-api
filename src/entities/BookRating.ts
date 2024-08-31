import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Index("book_rating_book_id_user_id_key", ["bookId", "userId"], {
  unique: true,
})
@Index("book_rating_pkey", ["id"], { unique: true })
@Entity("book_rating", { schema: "public" })
export class BookRating {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "book_id", nullable: true, unique: true })
  bookId: number | null;

  @Column("integer", { name: "user_id", nullable: true, unique: true })
  userId: number | null;

  @Column("integer", { name: "rating", nullable: true })
  rating: number | null;

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

  @ManyToOne(() => Book, (book) => book.bookRatings)
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;

  @ManyToOne(() => User, (user) => user.bookRatings)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
