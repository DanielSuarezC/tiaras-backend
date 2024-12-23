import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './domain/entites/Usuario.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { UsuarioAuthEntity } from 'src/auth/domain/entities/UsuarioAuth.entity';
import { RolAuthEntity } from 'src/auth/domain/entities/RolAuth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity], 'main'),
    TypeOrmModule.forFeature([UsuarioAuthEntity, RolAuthEntity], 'auth')
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService]
})
export class UsuariosModule {}
