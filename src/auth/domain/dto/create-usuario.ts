import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNumber()
    rol: number;
}