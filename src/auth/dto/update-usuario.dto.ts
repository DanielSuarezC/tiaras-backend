import { PartialType } from "@nestjs/swagger";
import { CreateUsuarioAuthDto } from "./create-usuario";

export class UpdateUsuarioAuthDto extends PartialType(CreateUsuarioAuthDto) {}