import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nombre de la Categoría',
        type: String
    })
    nombre: string;
}