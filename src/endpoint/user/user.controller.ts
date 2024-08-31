import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/common/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Req() req, @Res({ passthrough: true }) res) {
    this.logger.log('Fetching POST login');
    const { token, ...properties } = req.user;
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true, // use this in production to only send cookie over HTTPS
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return properties;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    this.logger.log('Fetching GET profile');
    return req.user;
  }

}
