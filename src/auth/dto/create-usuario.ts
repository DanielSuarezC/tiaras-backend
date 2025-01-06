import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUsuarioAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email del Usuario',
        type: String,
        required: true
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Contraseña del Usuario',
        type: String,
        required: true
    })
    password: string;

    @IsNumber()
    @ApiProperty({
        description: 'Rol del Usuario',
        type: Number,
        required: true
    })
    rol: number;
}