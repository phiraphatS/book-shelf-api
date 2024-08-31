import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/endpoint/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    UserModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Handle the JWT module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get('jwt_secret');
        return {
          secret: secret,
          signOptions: { expiresIn: '1d' },
        }
      },
    }),
    // Handle TypeOrm Feature
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*');
  }
}