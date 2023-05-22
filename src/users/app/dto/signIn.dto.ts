import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class SignInDto {

    @ApiProperty({
        example: 'example@example.com',
        description: 'Debe ser una cadena de texto con formato email valido',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'password',
        description: 'Debe ser una cadena de texto',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    password: string

}