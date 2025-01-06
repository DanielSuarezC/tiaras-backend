import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../entites/Categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria, 'main')
        private readonly categoriasRepository: Repository<Categoria>
    ) {}

    /* Obtener todas las Categorías */
    async findAll(): Promise<Categoria[]> {
        return this.categoriasRepository.find();
    }

    /* Obtener una Categoría por ID */
    async findOne(idCategoria: number): Promise<Categoria> {
        return this.categoriasRepository.findOneBy({ idCategoria });
    }

    /* Crear nueva Categoría */
    async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
        const categoria = new Categoria();
        categoria.nombre = createCategoriaDto.nombre;

        return this.categoriasRepository.save(categoria);
    }

    /* Actualizar Categoría */
    async update(idCategoria: number, updateCategoriaDto: UpdateCategoriaDto): Promise<UpdateResult> {
        const categoriaToUpdate = this.categoriasRepository.findOneBy({ idCategoria });
        if (!categoriaToUpdate) throw NotFoundException;

        const update = new Categoria();
        update.nombre = updateCategoriaDto.nombre;

        return await this.categoriasRepository.update(idCategoria, update);
    }

    /* Eliminar Categoría */
    async remove(idCategoria: number): Promise<void> {
        await this.categoriasRepository.delete(idCategoria);
    }
}
