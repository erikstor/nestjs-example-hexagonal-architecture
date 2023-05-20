import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "../infra/repositories/user.repository";
import {User} from "../domain/entities/users.entity";

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UserRepository) {
    }

    async findUserByEmail(email: string): Promise<User> {

        if (!email) throw new BadRequestException('El parametro email es requierido')

        const user = await this.userRepository.findUserByEmail(email)

        if (!user) throw new NotFoundException('No se encontro el usuario')

        return user

    }

}
