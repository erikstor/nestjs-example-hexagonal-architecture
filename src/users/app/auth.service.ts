import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);

    const compare = await bcrypt.compare(pass, user.clave!);

    if (!compare) {
      throw new BadRequestException();
    }

    return this.genareToken({ ...user });
  }

  async signUp(body: SignUpDto): Promise<{ access_token: string }> {
    body.clave = await bcrypt.hash(body.clave, 10);
    const user = await this.usersService.create(body);

    delete user.clave;
    return this.genareToken({ ...user });
  }

  async genareToken(payload) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: 'secret',
        privateKey: 'thisIsPrivate',
      }),
    };
  }
}
