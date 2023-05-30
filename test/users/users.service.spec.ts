import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsersService } from '../../src/users/app/users.service';
import { UserRepository } from '../../src/users/infra/repositories/user.repository';
import { RoleRepository } from '../../src/users/infra/repositories/role.repository';
import { RolesEntity, UsuariosEntity } from '../../src/users/domain/entities';

import { AppModule } from '../../src/app.module';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: UserRepository;
  let roleRepository: RoleRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UsersService, UserRepository, RoleRepository],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    roleRepository = moduleRef.get<RoleRepository>(RoleRepository);
  });

  describe('findUserByEmail', () => {
    it('should throw BadRequestException if email parameter is missing', async () => {
      await expect(usersService.findUserByEmail(undefined)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call userRepository.findUserByEmail with the provided email', async () => {
      const email = 'test@example.com';
      const findUserByEmailSpy = jest.spyOn(userRepository, 'findUserByEmail');
      await usersService.findUserByEmail(email);
      expect(findUserByEmailSpy).toHaveBeenCalledWith(email);
    });
  });

  describe('findOneById', () => {
    it('should throw BadRequestException if id parameter is missing', async () => {
      await expect(usersService.findOneById(undefined)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const id = 1;
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(undefined);
      await expect(usersService.findOneById(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return the found user', async () => {
      const id = 1;
      const expectedUser: UsuariosEntity = {
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'password',
        role: {
          id: 1,
          nombre: 'Administrador',
          descripcion: 'Administrador',
          user: undefined,
        },
      };
      jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValueOnce(expectedUser);
      const user = await usersService.findOneById(id);
      expect(user).toBe(expectedUser);
    });
  });

  describe('create', () => {
    const user = {
      nombre: 'John',
      apellido: 'Doe',
      celular: '1234567890',
      dni: '123456789',
      correo: 'test@example.com',
      clave: 'password',
      tipo: 'ADMIN',
    };

    const roleMock: RolesEntity = {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Administrador',
      user: undefined,
    };

    it('should throw BadRequestException if the email is already taken', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce({
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'password',
        role: 1,
      });
      await expect(usersService.create(user)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if the role is not found', async () => {
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockResolvedValueOnce(undefined);
      jest
        .spyOn(usersService, 'findRoleByName')
        .mockResolvedValueOnce(undefined);
      await expect(usersService.create(user)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create and save a new user', async () => {
      const role = roleMock;
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(usersService, 'findRoleByName').mockResolvedValueOnce(role);
      const saveSpy = jest.spyOn(userRepository, 'save').mockResolvedValueOnce({
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'password',
        role: 1,
      });
      const createdUser = await usersService.create(user);
      expect(createdUser).toBeDefined();
      expect(saveSpy).toHaveBeenCalledWith(expect.any(UsuariosEntity));
    });

    it('should throw InternalServerErrorException if there is an error during user saving', async () => {
      jest
        .spyOn(usersService, 'findUserByEmail')
        .mockResolvedValueOnce(undefined);
      jest.spyOn(usersService, 'findRoleByName').mockResolvedValueOnce({
        id: 1,
        nombre: 'Administrador',
        descripcion: 'Administrador',
        user: undefined,
      });
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new Error('Failed to save user'));
      await expect(usersService.create(user)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
