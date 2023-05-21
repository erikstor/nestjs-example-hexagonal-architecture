import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findUserByEmail(email);
        // todo implementar bcrypt
        if (user?.clave !== pass) {
            throw new UnauthorizedException();
        }

        const payload = {...user}

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: '1d',
                secret: 'secret',
                privateKey: 'thisIsPrivate',
            }),
        };
    }

}
