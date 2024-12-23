import { IsEmail, IsNotEmpty } from "class-validator";

export class UsuarioLogin {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}