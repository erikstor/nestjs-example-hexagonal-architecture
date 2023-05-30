import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from '../../src/users/app/auth.service';
import { UsersService } from '../../src/users/app/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../../src/users/app/dto';
import { AppModule } from '../../src/app.module';
import { UserRepository } from '../../src/users/infra/repositories/user.repository';
import { RoleRepository } from '../../src/users/infra/repositories/role.repository';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let userRepository: UserRepository;
  let roleRepository: RoleRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        UsersService,
        JwtService,
        UserRepository,
        RoleRepository,
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    roleRepository = moduleRef.get<RoleRepository>(RoleRepository);
  });

  describe('signIn', () => {
    const email = 'test@example.com';
    const password = 'password';

    it('should throw BadRequestException if password is incorrect', async () => {
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce({
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'password123',
        role: 1,
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
      await expect(authService.signIn(email, password)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return access token if password is correct', async () => {
      const user = {
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'password123',
        role: 1,
      };
      const accessToken = 'generatedAccessToken';
      jest.spyOn(usersService, 'findUserByEmail').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest
        .spyOn(authService, 'genareToken')
        .mockResolvedValueOnce({ access_token: accessToken });
      const result = await authService.signIn(email, password);
      expect(result.access_token).toBe(accessToken);
    });
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      nombre: 'John',
      apellido: 'Doe',
      celular: '1234567890',
      dni: 123456789,
      correo: 'test@example.com',
      clave: 'hashedPassword',
      tipo: 'admin',
    };
    const hashedPassword = 'hashedPassword';

    it('should hash the password and create a new user', async () => {
      const createdUser = {
        id: 1,
        nombre: 'John',
        apellido: 'Doe',
        celular: '1234567890',
        dni: 123456789,
        correo: 'test@example.com',
        clave: 'hashedPassword',
        role: 1,
      };
      const accessToken = 'generatedAccessToken';
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(createdUser);
      jest
        .spyOn(authService, 'genareToken')
        .mockResolvedValueOnce({ access_token: accessToken });
      const result = await authService.signUp(signUpDto);
      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.clave, 10);
      expect(usersService.create).toHaveBeenCalledWith(signUpDto);
      expect(result.access_token).toBe(accessToken);
    });
  });
});
