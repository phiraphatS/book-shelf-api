import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/Book';
import { BookBorrowing } from 'src/entities/BookBorrowing';
import { BookRating } from 'src/entities/BookRating';
import { BookUnit } from 'src/entities/BookUnit';
import { MastBookType } from 'src/entities/MastBookType';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      BookBorrowing,
      BookRating,
      BookUnit,
      MastBookType,
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
