import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { ClienteRegister } from './domain/dto/ClienteRegister.dto';
import { RolEnum } from 'src/auth/domain/dto/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('clientes')
@Roles(RolEnum.ADMINISTRADOR)
export class ClientesController {
    constructor(
        private readonly clientesService: ClientesService
    ) {}

    @Get()
    async findAll() {
        return await this.clientesService.findAll();
    }

    @Get(':idCliente')
    async findOne(@Param('idCliente') id: number) {
        return await this.clientesService.findOne(id);
    }

    @Post()
    async create(@Body() cliente: ClienteRegister) {
        return await this.clientesService.create(cliente);
    }

    @Put(':idCliente')
    async update(@Param('idCliente') idCliente: number, @Body() cliente: ClienteRegister) {
        return await this.clientesService.update(idCliente, cliente);
    }
}
