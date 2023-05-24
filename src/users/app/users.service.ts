import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../infra/repositories/user.repository';
import { UsuariosEntity } from '../domain/entities';
import { RoleRepository } from '../infra/repositories/role.repository';
import { SignUpUsersTypes } from '../domain/interfaces/users';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rolesRepository: RoleRepository,
  ) {}

  async findUserByEmail(email: string): Promise<UsuariosEntity> {
    if (!email)
      throw new BadRequestException('El parametro email es requierido');

    return await this.userRepository.findUserByEmail(email);
  }

  async findOneById(id: number): Promise<UsuariosEntity> {
    if (!id) throw new BadRequestException('El parametro id es requierido');

    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('No se encontro el usuario');

    return user;
  }

  async create(user: any): Promise<UsuariosEntity> {
    const toSave = new UsuariosEntity();

    let existUser = await this.findUserByEmail(user.correo);

    if (existUser) {
      throw new BadRequestException('El correo ya esta ocupado');
    }

    const role = await this.findRoleByName(user.tipo);

    if (!role) throw new BadRequestException('El rol no fue encontrado');

    toSave.nombre = user.nombre;
    toSave.apellido = user.apellido;
    toSave.celular = user.celular;
    toSave.dni = user.dni;
    toSave.correo = user.correo;
    toSave.clave = user.clave;
    toSave.role = role.id;

    try {
      return this.userRepository.save(toSave).catch((e) => {
        throw new InternalServerErrorException({
          message: 'Ocurrio un fallo en el guardado del usuario',
          detail: e,
        });
      });
    } catch (e) {
      throw new InternalServerErrorException(
        'Ocurrio un fallo en el guardado del usuario',
      );
    }
  }

  async findRoleByName(name: string) {
    return await this.rolesRepository.findOneBy({
      nombre: SignUpUsersTypes[name],
    });
  }
}
