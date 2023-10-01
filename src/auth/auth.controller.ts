import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // auth/signup
  signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  // auth/signin
  signin(@Body(new ValidationPipe()) signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
