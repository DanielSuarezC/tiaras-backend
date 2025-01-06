import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateItemDto {
    @IsNumber()
    @ApiProperty({
        name: 'idProducto',
        description: 'Identificador del producto',
        type: Number,
    })
    idProducto: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'cantidad',
        description: 'Cantidad del producto',
        type: Number,
    })
    cantidad: number;
}