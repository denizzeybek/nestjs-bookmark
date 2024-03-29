"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(signupDto) {
        try {
            const hash = await argon.hash(signupDto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: signupDto.email,
                    hash,
                    firstName: signupDto.firstName,
                    lastName: signupDto.lastName,
                },
            });
            delete user.hash;
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials Taken');
                }
            }
            throw error;
        }
    }
    async signin(signinDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signinDto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Credentials incorrect');
        }
        const passwordMatches = await argon.verify(user.hash, signinDto.password);
        if (!passwordMatches) {
            throw new common_1.ForbiddenException('Credentials incorrect');
        }
        delete user.hash;
        const token = await this.signToken({ userId: user.id, email: user.email });
        const { access_token } = token;
        const response = { ...user, access_token };
        return response;
    }
    async signToken(signTokenDto) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map