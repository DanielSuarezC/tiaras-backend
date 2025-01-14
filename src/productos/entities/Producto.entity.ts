import { Transform } from "class-transformer";
import { Categoria } from "src/categorias/entites/Categoria.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'productos' })
export class Producto {
    @PrimaryGeneratedColumn({ name: 'id_producto', type: 'int' })
    idProducto: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50 })
    nombre: string;

    @Column({ name: 'descripcion', type: 'varchar', length: 255 })
    descripcion: string;

    @Column({ name: 'precio', type: 'decimal' })
    precio: number;

    @Column({ name: 'imagenes', array: true, type: 'text' })
    imagenes: string[];

    @ManyToMany(() => Categoria, { eager: true })
    @Transform(({ value }) => value.map(val => val.nombre))
    @JoinTable({ name: 'productos_categorias', joinColumn: { name: 'id_producto' }, inverseJoinColumn: { name: 'id_categoria' } })
    categorias: Categoria[];
}