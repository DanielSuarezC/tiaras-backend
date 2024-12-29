import { IsNotEmpty, IsString } from "class-validator";

export class CategoriaRegister {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}