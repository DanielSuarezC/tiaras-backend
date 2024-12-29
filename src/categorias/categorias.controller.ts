import { Controller, Get } from '@nestjs/common';
import { CategoriasService } from './services/categorias.service';

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
}
