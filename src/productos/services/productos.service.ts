import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from '../domain/entities/Producto.entity';
import { Repository, In } from 'typeorm';
import { ProductoRegister } from '../domain/dto/ProductoRegister.dto';
import { CategoriaEntity } from 'src/categorias/domain/entites/Categoria.entity';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(ProductoEntity, 'main')
        private readonly productoRepository: Repository<ProductoEntity>,
        @InjectRepository(CategoriaEntity, 'main')
        private readonly categoriaRepository: Repository<CategoriaEntity>
    ) {}

    async findAll(): Promise<[ProductoEntity[], number]> {
        return await this.productoRepository.findAndCount({ take: 25 });
    }

    async findOne(idProducto: number): Promise<ProductoEntity> {
        return await this.productoRepository.findOneBy({ idProducto });
    }

    async existsByIds(ids: number[]): Promise<boolean> {
        return await this.productoRepository.existsBy({ idProducto: In(ids) });
    }

    async findByIds(ids: number[]): Promise<ProductoEntity[]> {
        return await this.productoRepository.findBy({ idProducto: In(ids) });
    }

    async create(producto: ProductoRegister, fileNames: string[]): Promise<ProductoEntity> {
        const productoEntity = new ProductoEntity();
        productoEntity.nombre = producto.nombre;
        productoEntity.descripcion = producto.descripcion;
        productoEntity.precio = producto.precio;
        productoEntity.imagenes = fileNames;

        const categoriasExists: boolean = await this.categoriaRepository.existsBy({ idCategoria: In(producto.categorias) });
        if (!categoriasExists) throw new Error('Alguna de las categorías no existe');

        const categorias: CategoriaEntity[] = await this.categoriaRepository.findBy({ idCategoria: In(producto.categorias) });
        productoEntity.categorias = categorias;

        return await this.productoRepository.save(productoEntity);
    }

    async update(producto: ProductoEntity): Promise<ProductoEntity> {
        return await this.productoRepository.save(producto);
    }

    async delete(idProducto: number): Promise<void> {
        await this.productoRepository.delete(idProducto);
    }
}
