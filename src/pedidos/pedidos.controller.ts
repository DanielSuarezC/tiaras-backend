import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PedidosService } from './services/pedidos.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolEnum } from 'src/auth/dto/roles.enum';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('pedidos')
@Roles(RolEnum.ADMINISTRADOR)
export class PedidosController {
    constructor(
        private readonly pedidosService: PedidosService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los pedidos' })
    @ApiResponse({ 
        status: 200, 
        description: 'OK',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    idPedido: { type: 'number' },
                    cliente: {
                        type: 'object',
                        properties: {
                            idCliente: { type: 'number' },
                            nombre: { type: 'string' },
                            apellido: { type: 'string' },
                            email: { type: 'string' },
                            telefono: { type: 'string' },
                            direccion: { type: 'string' },
                            ciudad: { type: 'string' },
                        }
                    },
                    fechaPedido: { type: 'string' },
                    fechaEntrega: { type: 'string' },
                    valorTotal: { type: 'number' },
                    valorPagado: { type: 'number' },
                    estadoPago: { type: 'string' },
                    estadoPedido: { type: 'string' },
                    items: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                idItem: { type: 'number' },
                                producto: {
                                    type: 'object',
                                    properties: {
                                        idProducto: { type: 'number' },
                                        nombre: { type: 'string' },
                                        descripcion: { type: 'string' },
                                        precio: { type: 'number' },
                                        stock: { type: 'number' },
                                    }
                                },
                                cantidad: { type: 'number' },
                                subtotal: { type: 'number' },
                            }
                        }
                    }
                }
            }
        }
    })
    async findPedidos() {
        return await this.pedidosService.findAll();
    }

    @Get(':idPedido')
    @ApiOperation({ summary: 'Obtener un pedido por ID' })
    @ApiParam({ name: 'idPedido', type: 'number' })
    @ApiResponse({ 
        status: 200, 
        description: 'OK',
        schema: {
            type: 'object',
            properties: {
                idPedido: { type: 'number' },
                cliente: {
                    type: 'object',
                    properties: {
                        idCliente: { type: 'number' },
                        nombre: { type: 'string' },
                        apellido: { type: 'string' },
                        email: { type: 'string' },
                        telefono: { type: 'string' },
                        direccion: { type: 'string' },
                        ciudad: { type: 'string' },
                    }
                },
                fechaPedido: { type: 'string' },
                fechaEntrega: { type: 'string' },
                valorTotal: { type: 'number' },
                valorPagado: { type: 'number' },
                estadoPago: { type: 'string' },
                estadoPedido: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idItem: { type: 'number' },
                            producto: {
                                type: 'object',
                                properties: {
                                    idProducto: { type: 'number' },
                                    nombre: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    precio: { type: 'number' },
                                    stock: { type: 'number' },
                                }
                            },
                            cantidad: { type: 'number' },
                            subtotal: { type: 'number' },
                        }
                    }
                }
            }
        }
    })
    async findPedidoById(@Param('idPedido') idPedido: number) {
        return await this.pedidosService.findOne(idPedido);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un pedido' })
    @ApiBody({ 
        type: CreatePedidoDto,
        description: 'Datos para crear un pedido'
     })
    @ApiResponse({
        status: 201,
        description: 'CREATED',
        schema: {
            type: 'object',
            properties: {
                idPedido: { type: 'number' },
                cliente: {
                    type: 'object',
                    properties: {
                        idCliente: { type: 'number' },
                        nombre: { type: 'string' },
                        apellido: { type: 'string' },
                        email: { type: 'string' },
                        telefono: { type: 'string' },
                        direccion: { type: 'string' },
                        ciudad: { type: 'string' },
                    }
                },
                fechaPedido: { type: 'string' },
                fechaEntrega: { type: 'string' },
                valorTotal: { type: 'number' },
                valorPagado: { type: 'number' },
                estadoPago: { type: 'string' },
                estadoPedido: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idItem: { type: 'number' },
                            producto: {
                                type: 'object',
                                properties: {
                                    idProducto: { type: 'number' },
                                    nombre: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    precio: { type: 'number' },
                                    imagenes: {
                                        type: 'array',
                                        items: {
                                            type: 'array',
                                            items: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            },
                            cantidad: { type: 'number' },
                        }
                    }
                }
            }
        }
    })
    async createPedido(@Body() createPedidoDto: CreatePedidoDto) {
        return await this.pedidosService.createPedido(createPedidoDto);
    }

    @Patch(':idPedido')
    @ApiOperation({ summary: 'Actualizar un pedido' })
    @ApiParam({ name: 'idPedido', type: 'number' })
    @ApiBody({ 
        type: UpdatePedidoDto,
        description: 'Datos para actualizar un pedido'
    })
    @ApiResponse({
        status: 200,
        description: 'OK',
        schema: {
            type: 'object',
            properties: {
                idPedido: { type: 'number' },
                cliente: {
                    type: 'object',
                    properties: {
                        idCliente: { type: 'number' },
                        nombre: { type: 'string' },
                        apellido: { type: 'string' },
                        email: { type: 'string' },
                        telefono: { type: 'string' },
                        direccion: { type: 'string' },
                        ciudad: { type: 'string' },
                    }
                },
                fechaPedido: { type: 'string' },
                fechaEntrega: { type: 'string' },
                valorTotal: { type: 'number' },
                valorPagado: { type: 'number' },
                estadoPago: { type: 'string' },
                estadoPedido: { type: 'string' },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idItem: { type: 'number' },
                            producto: {
                                type: 'object',
                                properties: {
                                    idProducto: { type: 'number' },
                                    nombre: { type: 'string' },
                                    descripcion: { type: 'string' },
                                    precio: { type: 'number' },
                                    stock: { type: 'number' },
                                }
                            },
                            cantidad: { type: 'number' },
                            subtotal: { type: 'number' },
                        }
                    }
                }
            }
        }
    })
    async updatePedido(@Param('idPedido') idPedido: number, @Body() updatePedidoDto: UpdatePedidoDto) {
        return await this.pedidosService.updatePedido(idPedido, updatePedidoDto);
    }
}
