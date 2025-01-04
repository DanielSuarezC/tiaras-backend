import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './domain/entities/Producto.entity';
import { MulterModule } from '@nestjs/platform-express';
import { CategoriaEntity } from 'src/categorias/domain/entites/Categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductoEntity, CategoriaEntity], 'main'),
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
