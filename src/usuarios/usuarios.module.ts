import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { Usuario } from './entites/Usuario.entity';
import { UsuarioAuth } from 'src/auth/entities/UsuarioAuth.entity';
import { RolAuth } from 'src/auth/entities/RolAuth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario], 'main'),
    TypeOrmModule.forFeature([UsuarioAuth, RolAuth], 'auth')
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService]
})
export class UsuariosModule {}
