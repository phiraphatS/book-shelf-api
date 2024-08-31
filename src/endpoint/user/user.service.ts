import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { DataSource, Repository } from 'typeorm';
import { Logger } from 'winston';
import * as winston from 'winston';

@Injectable()
export class UserService {
  private readonly logger = new Logger({ transports: [new winston.transports.Console()] });

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return this.userRepository.findOne({ where: { username } });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
