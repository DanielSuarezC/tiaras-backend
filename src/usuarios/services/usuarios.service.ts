import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../domain/entites/Usuario.entity';
import { UsuarioRegister } from '../domain/dto/UsuarioRegister';
import { UsuarioSignIn } from 'src/auth/domain/dto/UsuarioSignIn.dto';
import { UsuarioRegistered } from '../../auth/domain/dto/UsuarioRegistered.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(UsuarioEntity, 'main')
        private readonly usuariosRepository: Repository<UsuarioEntity>,
        private readonly authService: AuthService
    ) {}

    /* Registrar nuevo Usuario */
    async signInUsuario(usuario: UsuarioRegister): Promise<any> {
        const usuarioSignIn: UsuarioSignIn = new UsuarioSignIn();
        usuarioSignIn.email = usuario.email;
        usuarioSignIn.password = usuario.password;
        usuarioSignIn.rol = usuario.rol;

        const idUsuarioRegistered: number = await this.authService.signIn(usuarioSignIn);
        if (!idUsuarioRegistered) throw BadRequestException;

        const usuarioEntity: UsuarioEntity = new UsuarioEntity();
        usuarioEntity.idUsuario = idUsuarioRegistered;
        usuarioEntity.nombre = usuario.nombre;
        usuarioEntity.apellidos = usuario.apellidos;
        usuarioEntity.telefono = usuario.telefono;
        usuarioEntity.email = usuario.email;
        
        return await this.usuariosRepository.save(usuarioEntity);
    }

    /* Obtener todos los Usuarios */
    async getUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuariosRepository.find();
    }
}
