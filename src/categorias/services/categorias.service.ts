import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CategoriaEntity } from '../domain/entites/Categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaRegister } from '../domain/dto/CategoriaRegister.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(CategoriaEntity, 'main')
        private readonly categoriasRepository: Repository<CategoriaEntity>
    ) {}

    /* Obtener todas las Categorías */
    async findAll(): Promise<CategoriaEntity[]> {
        return this.categoriasRepository.find();
    }

    /* Obtener una Categoría por ID */
    async findOne(idCategoria: number): Promise<CategoriaEntity> {
        return this.categoriasRepository.findOneBy({ idCategoria });
    }

    /* Crear nueva Categoría */
    async create(categoria: CategoriaRegister): Promise<CategoriaEntity> {
        const categoriaEntity = new CategoriaEntity();
        categoriaEntity.nombre = categoria.nombre;

        return this.categoriasRepository.save(categoriaEntity);
    }

    /* Actualizar Categoría */
    async update(idCategoria: number, categoria: CategoriaRegister): Promise<UpdateResult> {
        const categoriaToUpdate = this.categoriasRepository.findOneBy({ idCategoria });
        if (!categoriaToUpdate) throw NotFoundException;

        return await this.categoriasRepository.update(idCategoria, categoria);
    }

    /* Eliminar Categoría */
    async remove(idCategoria: number): Promise<void> {
        await this.categoriasRepository.delete(idCategoria);
    }
}
