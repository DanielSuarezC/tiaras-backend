import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './services/clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/Cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente], 'main')],
  controllers: [ClientesController],
  providers: [ClientesService]
})
export class ClientesModule {}
