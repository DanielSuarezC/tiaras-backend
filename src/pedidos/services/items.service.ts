import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Item } from '../entities/Item.entity';
import { CreateItemDto } from '../dto/create-item.dto';
import { Producto } from 'src/productos/entities/Producto.entity';
import { UpdateItemDto } from '../dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item, 'main')
        private readonly itemRepository: Repository<Item>,
        @InjectRepository(Producto, 'main')
        private readonly productoRepository: Repository<Producto>
    ) {}

    async createItems(createItemsDto: CreateItemDto[]): Promise<Item[]> {
        const productosExists: boolean = await this.productoRepository.existsBy({ idProducto: In(createItemsDto.map(item => item.idProducto)) });
        if (!productosExists) throw new NotFoundException('Algunos productos no existen');

        const items: Item[] = [];
        for (const createItemDto of createItemsDto) {
            const item = new Item();
            item.producto = await this.productoRepository.findOneBy({ idProducto: createItemDto.idProducto });;
            item.cantidad = createItemDto.cantidad;
            items.push(item);
        }
        
        return await this.itemRepository.save(items);
    }

    async updateItems(updateItemsDto: UpdateItemDto[]): Promise<Item[]> {
        const items: Item[] = await this.itemRepository.findBy({ idItem: In(updateItemsDto.map(item => item.idItem)) });

        for (const item of items) {
            const updateItemDto = updateItemsDto.find(updateItemDto => updateItemDto.idItem === item.idItem);
            item.producto = await this.productoRepository.findOneBy({ idProducto: updateItemDto.idProducto });
            item.cantidad = updateItemDto.cantidad;
        }
        
        return await this.itemRepository.save(items);
    }

    async deleteItems(items: Item[]): Promise<Item[]> {
        return await this.itemRepository.remove(items);
    }
}