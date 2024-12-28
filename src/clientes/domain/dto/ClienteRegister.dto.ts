import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { CustomTelephoneRegPattern } from "src/usuarios/validations/CustomTelephoneRegPattern";

export class ClienteRegister {
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellidos: string;

    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @IsNotEmpty()
    @Validate(CustomTelephoneRegPattern)
    telefono: string;

    @IsNotEmpty()
    pais: string;

    @IsNotEmpty()
    ciudad: string;
}