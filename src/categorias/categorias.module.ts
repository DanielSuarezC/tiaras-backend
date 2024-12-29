import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './domain/entites/Categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEntity], 'main')],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
