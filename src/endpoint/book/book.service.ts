import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Logger } from 'winston';
import * as winston from 'winston';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/Book';

@Injectable()
export class BookService {
  private readonly logger = new Logger({ transports: [new winston.transports.Console()] });
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  async getBookList(start, limit) {
    try {
      const booksQuery = this.bookRepository.createQueryBuilder('book')
        .select([
          'book.id',
          'book.title',
          'book.author',
          'book.coverImageUrl',
          'book.totalRating',
          'book.ratingCount',
          'bookType.name',
        ])
        .leftJoin('book.bookType', 'bookType')
      
      const total = await booksQuery.getCount();
      const books = await booksQuery.skip(start).take(limit).getMany();

      const results = books.map(book => {
        const { bookType, ...rest } = book;
        return {
          ...rest,
          bookType: bookType?.name,
        };
      });

      return {
        status: true,
        message: 'Book list fetched successfully',
        results: results,
        _meta: {
          total: total,
          start: start,
          limit: limit,
        },
      }
    } catch (error) {
      this.logger.error('Error while fetching book list :' + error.message);
      throw error;
    }
  }

  async getPopularBooks(limit: number = 3) {
    try {
      const books = await this.bookRepository.find({
        select: ['id', 'title', 'author', 'coverImageUrl', 'totalRating', 'ratingCount'],
        order: {
          totalRating: 'DESC',
          ratingCount: 'DESC'
        },
        take: limit
      });

      return {
        status: true,
        message: 'Popular books fetched successfully',
        results: books,
      };
    } catch (error) {
      this.logger.error('Error while fetching popular books: ' + error.message);
      throw error;
    }
  }

}
