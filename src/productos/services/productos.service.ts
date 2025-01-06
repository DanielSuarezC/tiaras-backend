import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entites/Categoria.entity';
import { Repository, In } from 'typeorm';
import { Producto } from '../entities/Producto.entity';
import { CreateProductoDto } from '../dto/create-producto.dto';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto, 'main')
        private readonly productoRepository: Repository<Producto>,
        @InjectRepository(Categoria, 'main')
        private readonly categoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<[Producto[], number]> {
        return await this.productoRepository.findAndCount({ take: 25 });
    }

    async findOne(idProducto: number): Promise<Producto> {
        return await this.productoRepository.findOneBy({ idProducto });
    }

    async findByIds(ids: number[]): Promise<Producto[]> {
        return await this.productoRepository.findBy({ idProducto: In(ids) });
    }

    async create(createProductoDto: CreateProductoDto, fileNames: string[]): Promise<Producto> {
        const producto = new Producto();
        producto.nombre = createProductoDto.nombre;
        producto.descripcion = createProductoDto.descripcion;
        producto.precio = createProductoDto.precio;
        producto.imagenes = fileNames;

        const categoriasExists: boolean = await this.categoriaRepository.existsBy({ idCategoria: In(createProductoDto.categorias) });
        if (!categoriasExists) throw new Error('Alguna de las categorías no existe');

        const categorias: Categoria[] = await this.categoriaRepository.findBy({ idCategoria: In(createProductoDto.categorias) });
        producto.categorias = categorias;

        return await this.productoRepository.save(producto);
    }

    async update(producto: Producto): Promise<Producto> {
        return await this.productoRepository.save(producto);
    }

    async delete(idProducto: number): Promise<void> {
        await this.productoRepository.delete(idProducto);
    }
}
