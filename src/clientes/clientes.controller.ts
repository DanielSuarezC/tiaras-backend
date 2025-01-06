import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ClientesService } from './services/clientes.service';
import { RolEnum } from 'src/auth/dto/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
@Roles(RolEnum.ADMINISTRADOR)
export class ClientesController {
    constructor(
        private readonly clientesService: ClientesService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los Clientes' })
    @ApiResponse({
        status: 200,
        description: 'Clientes Encontrados',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    idCliente: { type: 'number' },
                    nombre: { type: 'string' },
                    apellidos: { type: 'string' },
                    email: { type: 'string' },
                    telefono: { type: 'string' },
                    pais: { type: 'string' },
                    ciudad: { type: 'string' },
                }
            }
        }
    })
    async findAll() {
        return await this.clientesService.findAll();
    }

    @Get(':idCliente')
    @ApiOperation({ summary: 'Obtener un Cliente por su ID' })
    @ApiParam({
        name: 'idCliente',
        description: 'Id del Cliente',
        schema: { type: 'number' }
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente Encontrado',
        schema: {
            type: 'object',
            properties: {
                idCliente: { type: 'number' },
                nombre: { type: 'string' },
                apellidos: { type: 'string' },
                email: { type: 'string' },
                telefono: { type: 'string' },
                pais: { type: 'string' },
                ciudad: { type: 'string' },
            }
        }
    })
    async findOne(@Param('idCliente') id: number) {
        return await this.clientesService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un Cliente' })
    @ApiBody({
        type: CreateClienteDto,
        description: 'Objeto con Nombre, Apellidos, Email, Teléfono, País y Ciudad del Cliente'
    })
    @ApiResponse({
        status: 201,
        description: 'Cliente Creado',
        schema: {
            type: 'object',
            properties: {
                idCliente: { type: 'number' },
                nombre: { type: 'string' },
                apellidos: { type: 'string' },
                email: { type: 'string' },
                telefono: { type: 'string' },
                pais: { type: 'string' },
                ciudad: { type: 'string' },
            }
        }
    })
    async create(@Body() createClienteDto: CreateClienteDto) {
        return await this.clientesService.create(createClienteDto);
    }

    @Put(':idCliente')
    @ApiOperation({ summary: 'Actualizar un Cliente' })
    @ApiParam({
        name: 'idCliente',
        description: 'Id del Cliente',
        schema: { type: 'number' }
    })
    @ApiBody({
        type: UpdateClienteDto,
        description: 'Objeto con Nombre, Apellidos, Email, Teléfono, País y Ciudad del Cliente'
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente Actualizado',
        schema: {
            type: 'object',
            properties: {
                idCliente: { type: 'number' },
                nombre: { type: 'string' },
                apellidos: { type: 'string' },
                email: { type: 'string' },
                telefono: { type: 'string' },
                pais: { type: 'string' },
                ciudad: { type: 'string' },
            }
        }
    })
    async update(@Param('idCliente') idCliente: number, @Body() updateClienteDto: UpdateClienteDto) {
        return await this.clientesService.update(idCliente, updateClienteDto);
    }
}
