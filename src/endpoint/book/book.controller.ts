import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Res, Logger } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';
import * as winston from 'winston';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  async findAll(@Req() req, @Query('start') start: number, @Query('limit') limit: number, @Res() res) {
    this.logger.log('Fetching GET list');
    try {
      const results = await this.bookService.getBookList(start, limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ status: false, message: 'Internal server error', error: error.message });
    }
  }

  @Get('popular')
  async findPopular(@Req() req, @Query('limit') limit: number, @Res() res) {
    this.logger.log('Fetching GET popular');
    try {
      const results = await this.bookService.getPopularBooks(limit);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ status: false, message: 'Internal server error', error: error.message });
    }
  }

}
