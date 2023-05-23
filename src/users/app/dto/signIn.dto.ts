import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class SignInDto {

    @ApiProperty({
        example: 'example@example.com',
        description: 'Debe ser una cadena de texto con formato email valido',
        required: true
    })
    @IsString()
    @IsNotEmpty({message: 'El campo email es requerido'})
    @MinLength(1)
    @IsEmail({}, {message: 'El campo email debe ser un correo valido'})
    email: string

    @ApiProperty({
        example: 'password',
        description: 'Debe ser una cadena de texto',
        required: true
    })
    @IsString({message: 'La clave es obligatoria'})
    @IsNotEmpty({message: 'La clave es obligatoria'})
    password: string

}