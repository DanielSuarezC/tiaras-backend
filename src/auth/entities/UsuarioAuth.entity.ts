import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolAuth } from "./RolAuth.entity";

@Entity({ name: 'usuarios' })
export class UsuarioAuth {
    @PrimaryGeneratedColumn({ name: 'id_usuario', type: 'int' })
    idUsuario: number;

    @Column({ type: 'varchar', length: 60, unique: true, name: 'email', nullable: false })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 60 })
    password: string;

    @ManyToOne(() => RolAuth, { eager: true })
    @JoinColumn({ name: 'id_rol' })
    rol: RolAuth;
}