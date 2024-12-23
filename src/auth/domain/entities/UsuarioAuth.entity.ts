import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolAuthEntity } from "./RolAuth.entity";

@Entity({ name: 'usuarios' })
export class UsuarioAuthEntity {
    @PrimaryGeneratedColumn("identity", { name: 'id_usuario' })
    idUsuario: number;

    @Column({ type: 'varchar', length: 60, unique: true, name: 'email', nullable: false })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 60 })
    password: string;

    @ManyToOne(() => RolAuthEntity, { eager: true })
    @JoinColumn({ name: 'id_rol' })
    rol: RolAuthEntity;
}