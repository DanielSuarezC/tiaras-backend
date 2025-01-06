import { Producto } from "src/productos/entities/Producto.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./Pedido.entity";
import { Exclude } from "class-transformer";

@Entity({ name: 'items' })
export class Item {
    @PrimaryGeneratedColumn({ name: 'id_item', type: 'int' })
    idItem: number;

    @ManyToOne(() => Pedido, pedido => pedido.items, { eager: false })
    @JoinColumn({ name: 'id_pedido', referencedColumnName: 'idPedido' })
    pedido: Pedido;

    @ManyToOne(() => Producto, producto => producto.idProducto, { eager: true })
    @JoinColumn({ name: 'id_producto', referencedColumnName: 'idProducto' })
    producto: Producto;

    @Column({ name: 'cantidad', type: 'int' })
    cantidad: number;

    /* Constructors */
    constructor() {
        this.cantidad = 0;
    }
}