import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Categoria } from 'src/categorias/entites/Categoria.entity';
import { Producto } from './entities/Producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria], 'main'),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads'
      })
    })
  ],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
