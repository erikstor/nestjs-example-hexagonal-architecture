import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {UsersController} from './users/infra/controller/users.controller';
import {UsersService} from './users/app/users.service';
// import process from "process";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserRepository} from "./users/infra/repositories/user.repository";


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'hexagonal',
            username: 'postgres',
            password: '12345',
            autoLoadEntities: true,
            synchronize: true
        }),
        UsersModule
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
})
export class AppModule {
}
