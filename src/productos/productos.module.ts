import { Module } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './productos.controller';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
