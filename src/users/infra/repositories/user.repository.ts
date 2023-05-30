import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsuariosEntity } from '../../domain/entities';

@Injectable()
export class UserRepository extends Repository<UsuariosEntity> {
  constructor(public readonly dataSource: DataSource) {
    super(UsuariosEntity, dataSource.createEntityManager());
  }

  async findUserByEmail(email: string): Promise<UsuariosEntity> {
    return this.findOneBy({
      correo: email,
    });
  }

  async findById(id: number): Promise<UsuariosEntity> {
    return this.findOneBy({ id });
  }
}
