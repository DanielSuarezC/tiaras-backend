import { Type } from "class-transformer";
import { IsNumber, IsNotEmpty, IsDate, IsPositive, IsIn, IsArray, IsObject } from "class-validator";
import { CreateItemDto } from "./create-item.dto";
import { UpdateItemDto } from "./update-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePedidoDto {
    @IsNumber()
    @ApiProperty({
        name: 'idCliente',
        description: 'Id del cliente al que se le asignará el pedido',
        type: Number
    })
    idCliente: number;

    @IsNotEmpty()
    @ApiProperty({
        name: 'evento',
        description: 'Nombre del evento al que se le asignará el pedido',
        type: String
    })
    evento: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'fechaPedido',
        description: 'Fecha en la que se realizó el pedido',
        type: Date
    })
    fechaPedido: Date;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'fechaEntrega',
        description: 'Fecha en la que se entregará el pedido',
        type: Date
    })
    fechaEntrega: Date;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'valorTotal',
        description: 'Valor total del pedido',
        type: Number
    })
    valorTotal: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'valorPagado',
        description: 'Valor pagado del pedido',
        type: Number
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
        type: [UpdateItemDto],
    })
    items: UpdateItemDto[];
}