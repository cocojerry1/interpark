import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { register } from 'module';
import { RegisterDto } from './dto/register.dto';
import { Point } from 'src/point/entities/point.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.userService.register(registerDto.email, registerDto.password, registerDto.nickname);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getUserProfile(@Req() req) {
    
    const email = req.user.email;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const pointsSum = await this.userService.getPoint(user.id);
    return {
      email: user.email,
      nickname: user.nickname,
      totalPoints: pointsSum || 0, // Ensures a fallback to 0 if null or undefined
    };
  }
}