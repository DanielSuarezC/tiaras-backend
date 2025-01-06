import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './services/categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolEnum } from 'src/auth/dto/roles.enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('categorias')
@Roles(RolEnum.VENDEDOR)
export class CategoriasController {
    constructor(
        private readonly categoriasService: CategoriasService
    ) {}
 
    @Get()
    @ApiOperation({ summary: 'Obtener todas las Categorías' })
    @ApiResponse({ 
        status: 200, 
        description: 'Categorías Encontradas', 
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    idCategoria: { type: 'number' },
                    nombre: { type: 'string' },
                }
            }
        }
    })
    async findAll() {
        return this.categoriasService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una Categoría' })
    @ApiParam({
        name: 'idCategoria',
        description: 'Id de la Categoría',
        schema: { type: 'number' }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Categoría Encontrada', 
        schema: {
            type: 'object',
            properties: {
                idCategoria: { type: 'number' },
                nombre: { type: 'string' },
            }
        }
    })
    async findOne(idCategoria: number) {
        return this.categoriasService.findOne(idCategoria);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una Categoría' })
    @ApiBody({ 
        type: CreateCategoriaDto, 
        description: 'Objeto con Nombre de la Categoría'
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Categoría Creada', 
        schema: {
            type: 'object',
            properties: {
                idCategoria: { type: 'number' },
                nombre: { type: 'string' },
            }
        }
    })
    async create(@Body() createCategoriaDto: CreateCategoriaDto) {
        return this.categoriasService.create(createCategoriaDto);
    }

    @Put(':idCategoria')
    @ApiOperation({ summary: 'Actualizar una Categoría' })
    @ApiParam({
        name: 'idCategoria',
        description: 'Id de la Categoría',
        schema: { type: 'number' }
    })
    @ApiBody({ 
        type: UpdateCategoriaDto, 
        description: 'Objeto con Nombre de la Categoría'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Categoría Actualizada', 
        schema: {
            type: 'object',
            properties: {
                idCategoria: { type: 'number' },
                nombre: { type: 'string' },
            }
        }
    })
    async update(@Param('idCategoria') idCategoria: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
        return this.categoriasService.update(idCategoria, updateCategoriaDto);
    }
}
