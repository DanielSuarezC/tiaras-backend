import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class CreateInsumoDto {
    @IsNotEmpty()
    @ApiProperty({
        name: 'nombre',
        description: 'Nombre del insumo',
        type: 'string'
    })
    nombre: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'descripcion',
        description: 'Descripción del insumo',
        type: 'string'
    })
    descripcion: string;

    @IsNotEmpty()
    @IsIn(['Producción', 'Envío'])
    @ApiProperty({
        name: 'tipo',
        description: 'Tipo de insumo',
        type: 'string',
        enum: ['Producción', 'Envío']
    })
    tipo: string;

    @IsNotEmpty()
    @ApiProperty({
        name: 'unidadMedida',
        description: 'Unidad de medida del insumo',
        type: 'string'
    })
    unidadMedida: string;
}