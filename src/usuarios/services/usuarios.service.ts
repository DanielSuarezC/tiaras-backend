import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { Usuario } from '../entites/Usuario.entity';
import { CreateUsuarioAuthDto } from 'src/auth/dto/create-usuario';
import { UpdateUsuarioAuthDto } from 'src/auth/dto/update-usuario.dto';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectEntityManager('main')
        private readonly entityManager: EntityManager,
        @InjectRepository(Usuario, 'main')
        private readonly usuariosRepository: Repository<Usuario>,
        private readonly authService: AuthService
    ) {}

    /* Obtener todos los Usuarios */
    async getUsuarios(): Promise<Usuario[]> {
        return await this.usuariosRepository.find();
    }

    /* Registrar nuevo Usuario */
    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<any> {
        try {
            await this.entityManager.transaction(async (transactionEntityManager: EntityManager) => {
                const createUsuarioAuthDto: CreateUsuarioAuthDto = new CreateUsuarioAuthDto();
                createUsuarioAuthDto.email = createUsuarioDto.email;
                createUsuarioAuthDto.password = createUsuarioDto.password;
                createUsuarioAuthDto.rol = createUsuarioDto.rol;

                const idUsuarioRegistered: number = await this.authService.signIn(createUsuarioAuthDto);
                if (!idUsuarioRegistered) throw BadRequestException;

                const usuario: Usuario = new Usuario();
                usuario.idUsuario = idUsuarioRegistered;
                usuario.nombre = usuario.nombre;
                usuario.apellidos = usuario.apellidos;
                usuario.telefono = usuario.telefono;
                usuario.email = usuario.email;
                
                return await this.usuariosRepository.save(usuario);
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /* Actualizar Usuario */
    async updateUsuario(idUsuario: number, updateUsuarioDto): Promise<any> {
        const usuario: Usuario = await this.usuariosRepository.findOneBy({ idUsuario });
        if (!usuario) throw NotFoundException;

        usuario.nombre = updateUsuarioDto.nombre;
        usuario.apellidos = updateUsuarioDto.apellidos;
        usuario.telefono = updateUsuarioDto.telefono;
        usuario.email = updateUsuarioDto.email;

        const updateUsuarioAuthDto: UpdateUsuarioAuthDto = new UpdateUsuarioAuthDto();
        updateUsuarioAuthDto.email = usuario.email;

        if (updateUsuarioAuthDto.password.trim() !== '') updateUsuarioAuthDto.password = updateUsuarioDto.password;
        updateUsuarioAuthDto.rol = updateUsuarioDto.rol;

        return await this.usuariosRepository.save(usuario);
    }
}
