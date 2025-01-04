import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './services/pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './domain/entities/pedido.entity';
import { ClienteEntity } from 'src/clientes/domain/entities/Cliente.entity';
import { ProductoEntity } from 'src/productos/domain/entities/Producto.entity';
import { ItemEntity } from './domain/entities/Item.entity';
import { ItemsService } from './services/items.service';
import { ProductosService } from 'src/productos/services/productos.service';
import { CategoriaEntity } from 'src/categorias/domain/entites/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, ClienteEntity, ItemEntity, ProductoEntity, CategoriaEntity], 'main')],
  controllers: [PedidosController],
  providers: [PedidosService, ItemsService, ProductosService]
})
export class PedidosModule {}
