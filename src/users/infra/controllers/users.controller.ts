import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../../app/users.service";
import {AuthGuard} from "../guards/auth.guard";
import {SignInDto} from "../../app/dto/signIn.dto";
import {AuthService} from "../../app/auth.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }

    @Post('/find-by-email')
    @UseGuards(AuthGuard)
    findOne(@Body() body: { email }) {
        return this.usersService.findUserByEmail(body.email)
    }


    @Post('/sign-in')
    @ApiBody({
        type: SignInDto,
    })
    @ApiOperation({summary: 'Create cat'})
    @ApiResponse({status: 200, description: 'Entrega un token para acceder a los servicios que su rol le permita'})
    @ApiResponse({status: 400, description: 'Alguno de los parametros enviados en el body son incorrectos'})
    @ApiResponse({status: 500, description: 'Error en el servidor'})
    // @UseGuards(AuthGuard)
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body.email, body.password)
    }


}
