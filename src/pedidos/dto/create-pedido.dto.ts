import { IsArray, IsDate, IsIn, IsNotEmpty, IsNumber, IsObject, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import { CreateItemDto } from "./create-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePedidoDto {
    @IsNumber()
    @ApiProperty({
        name: 'idCliente',
        description: 'Identificador del cliente',
        type: Number,
    })
    idCliente: number;

    @IsNotEmpty()
    @ApiProperty({
        name: 'evento',
        description: 'Nombre del evento',
        type: String,
    })
    evento: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'fechaPedido',
        description: 'Fecha de realización del pedido',
        type: Date,
    })
    fechaPedido: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'fechaEntrega',
        description: 'Fecha de entrega del pedido',
        type: Date,
    })
    fechaEntrega: Date;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'valorTotal',
        description: 'Valor total del pedido',
        type: Number,
    })
    valorTotal: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'valorPagado',
        description: 'Valor pagado del pedido',
        type: Number,
    })
    valorPagado: number;

    @IsIn(['Pendiente', '50% Pagado', '100% Pagado'])
    @ApiProperty({
        name: 'estadoPago',
        description: 'Estado de pago del pedido',
        type: String,
        enum: ['Pendiente', '50% Pagado', '100% Pagado'],
    })
    estadoPago: string;

    @IsIn(['Pendiente', 'En Proceso', 'Terminado', 'Incidencia'])
    @ApiProperty({
        name: 'estadoPedido',
        description: 'Estado del pedido',
        type: String,
        enum: ['Pendiente', 'En Proceso', 'Terminado', 'Incidencia'],
    })
    estadoPedido: string;

    @IsArray()
    @IsObject({ each: true })
    @ApiProperty({
        name: 'items',
        description: 'Lista de items del pedido',
        type: [CreateItemDto],
    })
    items: CreateItemDto[];
}