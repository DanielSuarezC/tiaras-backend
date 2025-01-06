import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UsuarioLoginDto {
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
}