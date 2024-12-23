import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class UsuarioSignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNumber()
    rol: number;
}