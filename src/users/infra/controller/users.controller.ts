import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "../../app/users.service";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Post('/find-by-email')
    findOne(@Body() body: { email }) {
        return this.usersService.findUserByEmail(body.email)
    }


}
