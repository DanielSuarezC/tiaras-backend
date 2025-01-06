import { Module } from '@nestjs/common';
import { InvProductosController } from './productos/inv-productos.controller';
import { InvInsumosController } from './insumos/inv-insumos.controller';
import { InvInsumosService } from './insumos/inv-insumos.service';
import { InvProductosService } from './productos/inv-productos.service';

@Module({
  controllers: [InvProductosController, InvInsumosController],
  providers: [InvProductosService, InvInsumosService]
})
export class InventariosModule {}
