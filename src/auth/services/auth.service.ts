import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioAuthEntity } from '../domain/entities/UsuarioAuth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsuarioSignIn } from '../domain/dto/UsuarioSignIn.dto';
import { RolAuthEntity } from '../domain/entities/RolAuth.entity';
import { UsuarioRegistered } from '../domain/dto/UsuarioRegistered.dto';
import { comparePassword, hashPassword } from '../utilities/hashing';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioAuthEntity, 'auth')
        private usuarioRepository: Repository<UsuarioAuthEntity>,
        @InjectRepository(RolAuthEntity, 'auth')
        private rolRepository: Repository<RolAuthEntity>,
        private jwtService: JwtService
    ) {}

    async signIn(usuarioSignIn: UsuarioSignIn): Promise<number> {
        const { email, password, rol } = usuarioSignIn;

        const userExists: boolean = await this.usuarioRepository.existsBy({ email });
        if (userExists) throw new NotFoundException({ message: 'Este Email ya fue registrado!' });

        const roleAuth: boolean = await this.rolRepository.existsBy({ idRol: rol });
        if (!roleAuth) throw new NotFoundException({ message: 'Rol Inexistente!' });

        const usuarioToRegister: UsuarioAuthEntity = new UsuarioAuthEntity();
        usuarioToRegister.email = email;
        usuarioToRegister.password = await hashPassword(password);
        
        const usuarioRol = new RolAuthEntity();
        usuarioRol.idRol = rol;
        usuarioToRegister.rol = usuarioRol;

        const usuarioRegistered: UsuarioRegistered = new UsuarioRegistered();

        return (await this.usuarioRepository.save(usuarioToRegister)).idUsuario;;
    }
    
    async login(email: string, password): Promise<any> {
        const usuario: UsuarioAuthEntity = await this.usuarioRepository.findOneBy({ email });
        if (!usuario) throw new UnauthorizedException();

        const vldPassword = await comparePassword(password, usuario.password);
        if (!vldPassword) throw new UnauthorizedException();

        const payload = { sub: usuario.email, userId: usuario.idUsuario, rol: usuario.rol.nombre };
        return { access_token: await this.jwtService.signAsync(payload) }
    }
}
