import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entites/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria], 'main')],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
