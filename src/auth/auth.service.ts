import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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
  signin() {
    // find user by email

    // if user does not exist throw exception

    // compare password

    // if password incorrect throw exception

    // return user
    return 'signin';
  }
}
