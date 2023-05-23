import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "../../app/users.service";
import {AuthService} from "../../app/auth.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SignUpDto, SignInDto} from "../../app/dto";

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }


    @Post('/sign-up')
    @ApiBody({
        type: SignUpDto,
    })
    @ApiOperation({summary: 'Inicia la sesion de un usuario'})
    @ApiResponse({status: 200, description: 'Entrega un token para acceder a los servicios que su rol le permita'})
    @ApiResponse({status: 400, description: 'Alguno de los parametros enviados en el body son incorrectos'})
    @ApiResponse({status: 500, description: 'Error en el servidor'})
    signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body)
    }


    @Post('/sign-in')
    @ApiBody({
        type: SignInDto,
    })
    @ApiOperation({summary: 'Registra un usuario'})
    @ApiResponse({status: 200, description: 'Entrega un token para acceder a los servicios que su rol le permita'})
    @ApiResponse({status: 400, description: 'Alguno de los parametros enviados en el body son incorrectos'})
    @ApiResponse({status: 500, description: 'Error en el servidor'})
    // @UseGuards(AuthGuard)
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body.email, body.password)
    }


}
