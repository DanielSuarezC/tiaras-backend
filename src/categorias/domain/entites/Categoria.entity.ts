import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categorias' })
export class CategoriaEntity {
    @PrimaryGeneratedColumn({ name: 'id_categoria', type: 'int' })
    idCategoria: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true })
    nombre: string;
}