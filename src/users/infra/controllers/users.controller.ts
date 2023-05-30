import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../../app/users.service';
import { AuthService } from '../../app/auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpDto, SignInDto } from '../../app/dto';
import { AdminGuard } from '../guards';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-up')
  @ApiBody({
    type: SignUpDto,
  })
  @ApiOperation({ summary: 'Inicia la sesion de un usuario' })
  @ApiResponse({
    status: 200,
    description:
      'Entrega un token para acceder a los servicios que su rol le permita',
  })
  @ApiResponse({
    status: 400,
    description: 'Alguno de los parametros enviados en el body son incorrectos',
  })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  @ApiBody({
    type: SignInDto,
  })
  @ApiOperation({ summary: 'Registra un usuario' })
  @ApiResponse({
    status: 200,
    description:
      'Entrega un token para acceder a los servicios que su rol le permita',
  })
  @ApiResponse({
    status: 400,
    description: 'Alguno de los parametros enviados en el body son incorrectos',
  })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Get('/')
  @ApiQuery({
    name: 'id',
    description: 'Identificador unico del usuario',
    example: 1,
    type: 'number',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Busca un usuario por su id unico' })
  @ApiResponse({ status: 200, description: 'Entrega el usuario encontrado' })
  @ApiResponse({
    status: 400,
    description: 'Alguno de los parametros enviados en el body son incorrectos',
  })
  @ApiResponse({
    status: 401,
    description: 'Debe estar loggeado como administrador',
  })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  @UseGuards(AdminGuard)
  findOneById(@Query('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }
}
