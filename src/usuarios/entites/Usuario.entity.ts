import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn("identity", { name: 'id_usuario', type: 'int' })
    idUsuario: number;

    @Column({ name: 'nombre', type: 'varchar', length: 60 })
    nombre: string;

    @Column({ name: 'apellidos', type: 'varchar', length: 60 })
    apellidos: string;

    @Column({ name: 'telefono', type: 'varchar', length: 10 })
    telefono: string;

    @Column({ name: 'email', type: 'varchar', length: 60, unique: true })
    email: string;

    @Column({ name: 'enabled', type: 'boolean', default: true })
    enabled: boolean;
}