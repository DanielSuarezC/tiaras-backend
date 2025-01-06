import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { InsumosModule } from './insumos/insumos.module';
import { Insumo } from './insumos/entities/insumo.entity';
import { Categoria } from './categorias/entites/Categoria.entity';
import { Cliente } from './clientes/entities/Cliente.entity';
import { Item } from './pedidos/entities/Item.entity';
import { Pedido } from './pedidos/entities/Pedido.entity';
import { Producto } from './productos/entities/Producto.entity';
import { UsuarioAuth } from './auth/entities/UsuarioAuth.entity';
import { RolAuth } from './auth/entities/RolAuth.entity';
import { InsumoStock } from './inventarios/entities/InsumoStock.entity';
import { InventarioInsumo } from './inventarios/entities/InventarioInsumo.entity';
import { InventarioProducto } from './inventarios/entities/InventarioProducto.entity';
import { ProductoStock } from './inventarios/entities/ProductoStock.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'tiaras_auth',
        entities: [UsuarioAuth, RolAuth],
        autoLoadEntities: true,
        synchronize: true
      }),
      name: 'auth'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'tiaras_main',
        entities: [
          Cliente, 
          Producto, 
          Categoria, 
          Pedido, 
          Item, 
          InventarioProducto, 
          ProductoStock,
          Insumo,
          InsumoStock,
          InventarioInsumo,
        ],
        autoLoadEntities: true,
        synchronize: true
      }),
      name: 'main'
    }),
    ClientesModule,
    AuthModule,
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    PedidosModule,
    InventariosModule,
    InsumosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
