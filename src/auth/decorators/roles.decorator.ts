import { SetMetadata } from "@nestjs/common";
import { RolEnum } from "../dto/roles.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolEnum[]) => SetMetadata(ROLES_KEY, roles);