import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookBorrowing } from "./BookBorrowing";
import { BookRating } from "./BookRating";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Index("user_username_key", ["username"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "username", unique: true, length: 50 })
  username: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 50,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 50,
  })
  lastName: string | null;

  @Column("boolean", {
    name: "is_admin",
    nullable: true,
    default: () => "false",
  })
  isAdmin: boolean | null;

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

  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.user)
  bookBorrowings: BookBorrowing[];

  @OneToMany(() => BookRating, (bookRating) => bookRating.user)
  bookRatings: BookRating[];
}
