import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'roles' })
export class RolAuthEntity {
    @PrimaryGeneratedColumn("identity", { name: 'id_rol', type: 'int' })
    idRol: number;

    @Column({ type: 'varchar', length: 60, name: 'nombre', nullable: false })
    nombre: string;
}