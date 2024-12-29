import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from '../domain/entities/Producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(ProductoEntity, 'main')
        private readonly productoRepository: Repository<ProductoEntity>
    ) {}

    async findAll(): Promise<[ProductoEntity[], number]> {
        return await this.productoRepository.findAndCount({ take: 25 });
    }

    async findOne(idProducto: number): Promise<ProductoEntity> {
        return await this.productoRepository.findOneBy({ idProducto });
    }

    async create(producto: ProductoEntity): Promise<ProductoEntity> {
        return await this.productoRepository.save(producto);
    }
}
