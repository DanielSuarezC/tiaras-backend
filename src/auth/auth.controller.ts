import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AllowAnon } from './decorators/public.decorator';
import { UsuarioLoginDto } from './dto/login-usuario';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @AllowAnon()
    @Post('login')
    @ApiOperation({ 
        summary: 'Iniciar Sesión',  
        description: 'Iniciar Sesión con Email y Contraseña. El token de acceso generado tiene duración de un día.'
    })
    @ApiBody({ 
        type: UsuarioLoginDto, 
        description: 'Objeto con Email y Contraseña',
     })
    @ApiResponse({ 
        status: 200, 
        description: 'Inicio de Sesión Correcto!', 
        content: { 
            'application/json': { 
                example: { 
                    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZXNhbGFtdW5vejk1QGNvcnJlby51bmljb3Jkb2JhLmVkdS5jbyIsInVzZXJJZCI6MSwicm9sIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTczNjAzOTY2MiwiZXhwIjoxNzM2MTI2MDYyfQ.0Sic-JLVX-WuwjWUFapsYasRKeberCgqgwJVha3KsPM"
                } 
            } 
        } 
    })
    async login(@Body() usuarioLoginDto: UsuarioLoginDto): Promise<any> {
        const { email, password } = usuarioLoginDto;
        return this.authService.login(email, password);
    }

    async logout() {
        return this.authService.logout();
    }
}
