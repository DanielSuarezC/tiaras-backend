import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'insumos' })
export class Insumo {
    @PrimaryGeneratedColumn({ name: 'id_insumo', type: 'int' })
    idInsumo: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre: string;

    @Column({ name: 'descripcion', type: 'text' })
    descripcion: string;

    @Column({ name: 'imagen', type: 'text' })
    imagen: string;

    @Column({ name: 'tipo', type: 'varchar', length: 50 })
    tipo: string;

    @Column({ name: 'unidad_medida', type: 'varchar', length: 50 })
    unidadMedida: string;
}
