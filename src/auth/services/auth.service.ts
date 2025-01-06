import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from '../utilities/hashing';
import { UsuarioAuth } from '../entities/UsuarioAuth.entity';
import { RolAuth } from '../entities/RolAuth.entity';
import { CreateUsuarioAuthDto } from '../dto/create-usuario';
import { UpdateUsuarioAuthDto } from '../dto/update-usuario.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioAuth, 'auth')
        private usuarioRepository: Repository<UsuarioAuth>,
        @InjectRepository(RolAuth, 'auth')
        private rolRepository: Repository<RolAuth>,
        private jwtService: JwtService
    ) {}

    async signIn(createUsuarioAuthDto: CreateUsuarioAuthDto): Promise<number> {
        if (createUsuarioAuthDto.password.trim() === '') throw new NotFoundException({ message: 'Contraseña Requerida!' });
        const { email, password, rol } = createUsuarioAuthDto;

        const userExists: boolean = await this.usuarioRepository.existsBy({ email });
        if (userExists) throw new NotFoundException({ message: 'Este Email ya fue registrado!' });

        const roleAuth: boolean = await this.rolRepository.existsBy({ idRol: rol });
        if (!roleAuth) throw new NotFoundException({ message: 'Rol Inexistente!' });

        const usuarioToRegister: UsuarioAuth = new UsuarioAuth();
        usuarioToRegister.email = email;
        usuarioToRegister.password = await hashPassword(password);
        
        const usuarioRol = new RolAuth();
        usuarioRol.idRol = rol;
        usuarioToRegister.rol = usuarioRol;

        return (await this.usuarioRepository.save(usuarioToRegister)).idUsuario;
    }
    
    async login(email: string, password): Promise<any> {
        const usuario: UsuarioAuth = await this.usuarioRepository.findOneBy({ email });
        if (!usuario) throw new UnauthorizedException();

        const vldPassword = await comparePassword(password, usuario.password);
        if (!vldPassword) throw new UnauthorizedException();

        const payload = { sub: usuario.email, userId: usuario.idUsuario, rol: usuario.rol.nombre };
        return { access_token: await this.jwtService.signAsync(payload) }
    }

    async updateUsuario(idUsuario: number, updateUsuarioAuthDto: UpdateUsuarioAuthDto): Promise<any> {
        const { email, password, rol } = updateUsuarioAuthDto;

        const userExists: boolean = await this.usuarioRepository.existsBy({ idUsuario });
        if (!userExists) throw new NotFoundException({ message: 'Usuario Inexistente!' });

        const roleAuth: boolean = await this.rolRepository.existsBy({ idRol: rol });
        if (!roleAuth) throw new NotFoundException({ message: 'Rol Inexistente!' });

        const usuarioToUpdate: UsuarioAuth = await this.usuarioRepository.findOneBy({ idUsuario });
        if (usuarioToUpdate.email !== email) {
            const userExists: boolean = await this.usuarioRepository.existsBy({ email });
            if (userExists) throw new NotFoundException({ message: 'Este Email ya fue registrado!' });
            
            usuarioToUpdate.email = email;
        }

        if (password.trim() !== '') usuarioToUpdate.password = await hashPassword(password);
        
        const usuarioRol = new RolAuth();
        usuarioRol.idRol = rol;
        usuarioToUpdate.rol = usuarioRol;

        return await this.usuarioRepository.save(usuarioToUpdate);
    }

    async logout() {
        return { message: 'Logout Success!' };
    }
}
