import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AllowAnon } from './decorators/public.decorator';
import { UsuarioSignIn } from './domain/dto/UsuarioSignIn.dto';
import { UsuarioLogin } from './domain/dto/UsuarioLogin.dto';

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
    async login(@Body() usuarioLogin: UsuarioLogin): Promise<any> {
        const { email, password } = usuarioLogin;
        return this.authService.login(email, password);
    }
}
