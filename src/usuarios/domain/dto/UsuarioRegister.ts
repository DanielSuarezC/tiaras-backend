import { IsEmail, IsInt, IsNotEmpty, MaxLength } from "class-validator";

export class UsuarioRegister {
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellidos: string;

    @IsNotEmpty()
    @MaxLength(10)
    telefono: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsInt()
    rol: number;
}