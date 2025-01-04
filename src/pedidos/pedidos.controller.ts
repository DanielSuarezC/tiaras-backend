import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidosService } from './services/pedidos.service';
import { PedidoRegister } from './domain/dto/PedidoRegister.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolEnum } from 'src/auth/domain/dto/roles.enum';

@Controller('pedidos')
@Roles(RolEnum.ADMINISTRADOR)
export class PedidosController {
    constructor(
        private readonly pedidosService: PedidosService
    ) {}

    @Get()
    async findPedidos() {
        return await this.pedidosService.findAll();
    }

    @Get(':idPedido')
    async findPedidoById(@Body('idPedido') idPedido: number) {
        return await this.pedidosService.findOne(idPedido);
    }

    @Post()
    async createPedido(@Body() pedido: PedidoRegister) {
        return await this.pedidosService.createPedido(pedido);
    }
}
