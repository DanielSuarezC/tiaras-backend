import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { CustomTelephoneRegPattern } from "src/clientes/validations/CustomTelephoneRegPattern";

export class CreateClienteDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nombre del Cliente',
        type: String,
        required: true
    })
    nombre: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Apellidos del Cliente',
        type: String,
        required: true
    })
    apellidos: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email del Cliente',
        type: String,
        required: true
    })
    email: string;

    @IsNotEmpty()
    @Validate(CustomTelephoneRegPattern)
    @ApiProperty({
        description: 'Teléfono del Cliente. Formato: Cualquier número de 10 dígitos',
        type: String,
        required: true
    })
    telefono: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'País del Cliente',
        type: String,
        required: true
    })
    pais: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'Ciudad del Cliente',
        type: String,
        required: true
    })
    ciudad: string;
}