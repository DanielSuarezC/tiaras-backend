import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './services/pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './services/items.service';
import { ProductosService } from 'src/productos/services/productos.service';
import { Categoria } from 'src/categorias/entites/Categoria.entity';
import { Cliente } from 'src/clientes/entities/Cliente.entity';
import { Producto } from 'src/productos/entities/Producto.entity';
import { Item } from './entities/Item.entity';
import { Pedido } from './entities/Pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Cliente, Item, Producto, Categoria], 'main')],
  controllers: [PedidosController],
  providers: [PedidosService, ItemsService, ProductosService]
})
export class PedidosModule {}
