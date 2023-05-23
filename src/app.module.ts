import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {UsersController} from './users/infra/controllers/users.controller';
import {UsersService} from './users/app/users.service';
// import process from "process";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserRepository} from "./users/infra/repositories/user.repository";
import {AuthService} from "./users/app/auth.service";
import {JwtService} from "@nestjs/jwt";
import {RoleRepository} from "./users/infra/repositories/role.repository";


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
            entities: [
                './users/domain/entities/*.ts'
            ]
        }),
        UsersModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, AuthService, JwtService, RoleRepository],
})
export class AppModule {
}
