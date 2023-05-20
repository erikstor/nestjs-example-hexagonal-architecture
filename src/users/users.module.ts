import {Module} from '@nestjs/common';
import {UsersController} from "./infra/controller/users.controller";
import {UsersService} from "./app/users.service";
import {UserRepository} from "./infra/repositories/user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./domain/entities/users.entity";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        UserRepository
    ],
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ]
})
export class UsersModule {
}
