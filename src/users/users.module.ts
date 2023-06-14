import { Module } from '@nestjs/common';
import { UsersController } from './infra/controllers/users.controller';
import { UsersService } from './app/users.service';
import { UserRepository } from './infra/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity, UsuariosEntity } from './domain/entities';
import { AuthService } from './app/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RoleRepository } from './infra/repositories/role.repository';
import { HealthCheckController } from './infra/controllers/health.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  controllers: [UsersController, HealthCheckController],
  providers: [
    UsersService,
    UserRepository,
    RoleRepository,
    AuthService,
    JwtService,    
  ],
  imports: [
    TypeOrmModule.forFeature([UsuariosEntity, RolesEntity]),
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    TerminusModule
  ],
  exports: [
    UsersService,
    UserRepository,
    AuthService,
    JwtService,
    RoleRepository,
  ],
})
export class UsersModule {}
