import { IsArray, IsDate, IsIn, IsNotEmpty, IsNumber, IsObject, IsPositive } from "class-validator";
import { ItemRegister } from "./ItemRegister.dto";
import { Type } from "class-transformer";

export class PedidoRegister {
    @IsNumber()
    idCliente: number;

    @IsNotEmpty()
    evento: string;

    @IsDate()
    @Type(() => Date)
    fechaPedido: Date;

    @IsDate()
    @Type(() => Date)
    fechaEntrega: Date;

    @IsNumber()
    @IsPositive()
    valorTotal: number;

    @IsNumber()
    @IsPositive()
    valorPagado: number;

    @IsIn(['Pendiente', '50% Pagado', '100% Pagado'])
    estadoPago: string;

    @IsIn(['Pendiente', 'En Proceso', 'Terminado', 'Incidencia'])
    estadoPedido: string;

    @IsArray()
    @IsObject({ each: true })
    items: ItemRegister[];
}