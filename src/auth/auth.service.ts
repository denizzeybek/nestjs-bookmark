import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SignTokenDto } from './dto/signTokenDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(signupDto.password);
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: signupDto.email,
          hash,
          firstName: signupDto.firstName,
          lastName: signupDto.lastName,
        },
        // delete user.hash yapmak istemezsen yollayacağın veriden bu şekilde seçebilirsin
        // select: {
        //   id: true,
        //   email: true,
        //   firstName: true,
        //   lastName: true,
        // }
      });
      // kullanıcıya return ettiğin veriden hash'i çıkart
      delete user.hash;
      // return saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async signin(signinDto: SigninDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: signinDto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // compare password
    const passwordMatches = await argon.verify(user.hash, signinDto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // if password incorrect throw exception
    delete user.hash;
    // get token
    const token = await this.signToken({ userId: user.id, email: user.email });
    const { access_token } = token;
    const response = { ...user, access_token };
    // return user
    return response;
  }

  // Promise<string> olarak belirttiğin alan return type'a eşdeğer
  async signToken(
    signTokenDto: SignTokenDto
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: signTokenDto.userId,
      email: signTokenDto.email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
