import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nombre del Usuario',
        type: String,
        required: true
    })
    nombre: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Apellidos del Usuario',
        type: String,
        required: true
    })
    apellidos: string;

    @IsNotEmpty()
    @MaxLength(10)
    @ApiProperty({
        description: 'Teléfono del Usuario',
        type: String,
        required: true
    })
    telefono: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Correo Electrónico del Usuario',
        type: String,
        required: true
    })
    email: string;
7
    @ApiProperty({
        description: 'Contraseña del Usuario',
        type: String,
        required: false
    })
    password: string;

    @IsInt()
    @ApiProperty({
        description: 'ID del Rol del Usuario',
        type: Number,
        required: true
    })
    rol: number;
}