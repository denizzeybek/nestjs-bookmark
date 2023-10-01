import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(signupDto: SignupDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
    signin(): string;
}
