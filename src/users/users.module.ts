import {Module} from '@nestjs/common';
import {UsersController} from "./infra/controllers/users.controller";
import {UsersService} from "./app/users.service";
import {UserRepository} from "./infra/repositories/user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolesEntity, UsuariosEntity} from "./domain/entities";
import {AuthService} from './app/auth.service';
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        UserRepository,
        AuthService,
        JwtService
    ],
    imports: [
        TypeOrmModule.forFeature([
            UsuariosEntity,
            RolesEntity
        ]),
        JwtModule.register({ secret: 'hard!to-guess_secret' })
    ]
})
export class UsersModule {
}
