import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriasService } from './services/categorias.service';
import { CategoriaRegister } from './domain/dto/CategoriaRegister.dto';

@Controller('categorias')
export class CategoriasController {
    constructor(
        private readonly categoriasService: CategoriasService
    ) {}
 
    @Get()
    async findAll() {
        return this.categoriasService.findAll();
    }

    @Get(':id')
    async findOne(idCategoria: number) {
        return this.categoriasService.findOne(idCategoria);
    }

    @Post()
    async create(@Body() categoria: CategoriaRegister) {
        return this.categoriasService.create(categoria);
    }

    @Put(':idCategoria')
    async update(@Param('idCategoria') idCategoria: number, @Body() categoria: CategoriaRegister) {
        return this.categoriasService.update(idCategoria, categoria);
    }
}
