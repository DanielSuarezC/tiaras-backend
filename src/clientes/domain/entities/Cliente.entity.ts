import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clientes' })
export class ClienteEntity {
    @PrimaryGeneratedColumn({ name: 'id_cliente', type: 'int' })
    idCliente: number;

    @Column({ name: 'nombre', type: 'varchar', length: 60 })
    nombre: string;

    @Column({ name: 'apellidos', type: 'varchar', length: 60 })
    apellidos: string;

    @Column({ name: 'email', type: 'varchar', length: 60 })
    email: string;

    @Column({ name: 'telefono', type: 'varchar', length: 10 })
    telefono: string;

    @Column({ name: 'pais', type: 'varchar', length: 60 })
    pais: string;

    @Column({ name: 'ciudad', type: 'varchar', length: 60 })
    ciudad: string;
}