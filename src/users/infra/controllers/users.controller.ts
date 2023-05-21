import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../../app/users.service";
import {AuthGuard} from "../guards/auth.guard";
import {SignInDto} from "../../app/dto/signIn.dto";
import {AuthService} from "../../app/auth.service";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }

    @Post('/find-by-email')
    // @UseGuards(AuthGuard)
    findOne(@Body() body: { email }) {
        return this.usersService.findUserByEmail(body.email)
    }


    @Post('/sign-in')
    // @UseGuards(AuthGuard)
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body.email, body.password)
    }


}
