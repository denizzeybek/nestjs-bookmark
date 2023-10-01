import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createAuthDto: CreateAuthDto): string;
    signin(createAuthDto: CreateAuthDto): string;
}
