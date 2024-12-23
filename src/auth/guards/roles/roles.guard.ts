import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { extractTokenFromHeader } from 'src/auth/utilities/extract-token';
import { RolEnum } from 'src/auth/domain/dto/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolEnum>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const token: string = extractTokenFromHeader(context.switchToHttp().getRequest());

    try {
      const { rol } = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
      return requiredRoles.includes(rol);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
