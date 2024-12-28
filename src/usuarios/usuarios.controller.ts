import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UsuarioRegister } from './domain/dto/UsuarioRegister';
import { UsuariosService } from './services/usuarios.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolEnum } from 'src/auth/domain/dto/roles.enum';

@Controller('usuarios')
export class UsuariosController {
    constructor(
        private usuariosService: UsuariosService
    ) {}

    /* Registrar nuevo Usuario */
    @Post("sign-in")
    @Roles(RolEnum.ADMINISTRADOR)
    signInUsuario(@Body() usuarioRegister: UsuarioRegister) {
        return this.usuariosService.createUsuario(usuarioRegister);
    }

    /* Actualizar Usuario */
    @Put("update/:idUsuario")
    @Roles(RolEnum.ADMINISTRADOR)
    updateUsuario(@Param('idUsuario') idUsuario: number, @Body() usuarioRegister: UsuarioRegister) {
        return this.usuariosService.updateUsuario(idUsuario, usuarioRegister);
    }
}
