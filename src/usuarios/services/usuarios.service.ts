import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UsuarioEntity } from '../domain/entites/Usuario.entity';
import { UsuarioRegister } from '../domain/dto/UsuarioRegister';
import { UsuarioSignIn } from 'src/auth/domain/dto/UsuarioSignIn.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectEntityManager('main')
        private readonly entityManager: EntityManager,
        @InjectRepository(UsuarioEntity, 'main')
        private readonly usuariosRepository: Repository<UsuarioEntity>,
        private readonly authService: AuthService
    ) {}

    /* Obtener todos los Usuarios */
    async getUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuariosRepository.find();
    }

    /* Registrar nuevo Usuario */
    async createUsuario(usuario: UsuarioRegister): Promise<any> {
        try {
            await this.entityManager.transaction(async (transactionEntityManager: EntityManager) => {
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
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /* Actualizar Usuario */
    async updateUsuario(idUsuario: number, usuario: UsuarioRegister): Promise<any> {

        const usuarioEntity: UsuarioEntity = await this.usuariosRepository.findOneBy({ idUsuario: idUsuario });
        if (!usuarioEntity) throw NotFoundException;

        usuarioEntity.nombre = usuario.nombre;
        usuarioEntity.apellidos = usuario.apellidos;
        usuarioEntity.telefono = usuario.telefono;
        usuarioEntity.email = usuario.email;

        const usuarioSignIn: UsuarioSignIn = new UsuarioSignIn();
        usuarioSignIn.email = usuario.email;

        if (usuario.password.trim() !== '') usuarioSignIn.password = usuario.password;
        usuarioSignIn.rol = usuario.rol;

        const idUsuarioRegistered: number = await this.authService.signIn(usuarioSignIn);

        return await this.usuariosRepository.save(usuarioEntity);
    }
}
