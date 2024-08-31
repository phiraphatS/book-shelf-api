import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ConfigProjModule } from './common/config/config.module';
import { BookModule } from './endpoint/book/book.module';
import { UserModule } from './endpoint/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigProjModule,
    AuthModule,
    BookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
