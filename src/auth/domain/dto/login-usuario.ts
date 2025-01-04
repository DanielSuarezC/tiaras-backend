import { IsEmail, IsNotEmpty } from "class-validator";

export class UsuarioLoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}