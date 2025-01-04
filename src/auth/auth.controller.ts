import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AllowAnon } from './decorators/public.decorator';
import { UsuarioLoginDto } from './domain/dto/login-usuario';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    /* @AllowAnon()
    @Post('sign-in')
    async signIn(@Body() usuarioSignIn: UsuarioSignIn): Promise<any> {
        return this.authService.signIn(usuarioSignIn);
    } */

    @AllowAnon()
    @Post('login')
    async login(@Body() usuarioLogin: UsuarioLoginDto): Promise<any> {
        const { email, password } = usuarioLogin;
        return this.authService.login(email, password);
    }
}
