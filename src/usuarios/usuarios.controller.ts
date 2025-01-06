import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolEnum } from 'src/auth/dto/roles.enum';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('usuarios')
@Roles(RolEnum.ADMINISTRADOR)
export class UsuariosController {
    constructor(
        private usuariosService: UsuariosService
    ) {}

    /* Registrar nuevo Usuario */
    @Post("sign-in")
    @ApiOperation({ 
        summary: 'Registrar nuevo Usuario',
        description: 'Crea un nuevo Usuario en la base de datos de Autenticación y en la principal, con los datos proporcionados. Retorna un mensaje de éxito y los datos del Usuario creado.'
     })
    @ApiBody({ 
        type: CreateUsuarioDto, 
        description: 'Datos del Usuario' 
    })
    @ApiResponse({
        status: 201,
        description: 'El Usuario ha sido creado',
        schema: {
            type: 'object',
            properties: {
                idUsuario: { type: 'number'},
                nombre: {  type: 'string' },
                apellido: { type: 'string' },
                email: { type: 'string' },
                telefono: { type: 'string' }
            }
        }
    })
    signInUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.createUsuario(createUsuarioDto);
    }

    /* Actualizar Usuario */
    @Patch(":idUsuario")
    @ApiOperation({ 
        summary: 'Actualizar Usuario',
        description: 'Actualiza los datos de un Usuario en la base de datos de Autenticación y en la principal, con los datos proporcionados. Retorna un mensaje de éxito y los datos del Usuario actualizado.'
    })
    @ApiParam({
        name: 'idUsuario',
        description: 'ID del Usuario',
        schema: { type: 'number' }
    })
    @ApiBody({ 
        type: UpdateUsuarioDto, 
        description: 'Datos del Usuario'
    })
    updateUsuario(@Param('idUsuario') idUsuario: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        return this.usuariosService.updateUsuario(idUsuario, updateUsuarioDto);
    }
}
