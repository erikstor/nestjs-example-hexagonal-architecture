import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserRepository} from "../infra/repositories/user.repository";
import {UsuariosEntity} from "../domain/entities";

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UserRepository) {
    }

    async findUserByEmail(email: string): Promise<UsuariosEntity> {

        if (!email) throw new BadRequestException('El parametro email es requierido')

        const user = await this.userRepository.findUserByEmail(email)

        if (!user) throw new NotFoundException('No se encontro el usuario')

        return user

    }

    async findOneById(id: number): Promise<UsuariosEntity> {
        if (!id) throw new BadRequestException('El parametro id es requierido')

        const user = await this.userRepository.findById(id)

        if (!user) throw new NotFoundException('No se encontro el usuario')

        return user
    }

}
