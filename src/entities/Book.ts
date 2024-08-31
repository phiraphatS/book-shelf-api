import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MastBookType } from "./MastBookType";
import { BookRating } from "./BookRating";
import { BookUnit } from "./BookUnit";

@Index("book_pkey", ["id"], { unique: true })
@Index("book_isbn_key", ["isbn"], { unique: true })
@Entity("book", { schema: "public" })
export class Book {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "title", length: 255 })
  title: string;

  @Column("character varying", { name: "author", length: 255 })
  author: string;

  @Column("character varying", {
    name: "isbn",
    nullable: true,
    unique: true,
    length: 20,
  })
  isbn: string | null;

  @Column("character varying", {
    name: "cover_image_url",
    nullable: true,
    length: 255,
  })
  coverImageUrl: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", {
    name: "total_rating",
    nullable: true,
    default: () => "0",
  })
  totalRating: number | null;

  @Column("integer", {
    name: "rating_count",
    nullable: true,
    default: () => "0",
  })
  ratingCount: number | null;

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

  @ManyToOne(() => MastBookType, (mastBookType) => mastBookType.books)
  @JoinColumn([{ name: "book_type_id", referencedColumnName: "id" }])
  bookType: MastBookType;

  @OneToMany(() => BookRating, (bookRating) => bookRating.book)
  bookRatings: BookRating[];

  @OneToMany(() => BookUnit, (bookUnit) => bookUnit.book)
  bookUnits: BookUnit[];
}
