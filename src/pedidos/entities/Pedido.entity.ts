import { Cliente } from "src/clientes/entities/Cliente.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item.entity";

@Entity({ name: 'pedidos' })
export class Pedido {
    @PrimaryGeneratedColumn({ name: 'id_pedido', type: 'int' })
    idPedido: number;

    @ManyToOne(() => Cliente, cliente => cliente.idCliente, { eager: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;

    @Column({ name: 'evento', type: 'varchar' })
    evento: string;

    @Column({ name: 'fecha_pedido', type: 'date', default: () => 'CURRENT_DATE' })
    fechaPedido: Date;

    @Column({ name: 'fecha_entrega', type: 'date' })
    fechaEntrega: Date;

    @Column({ name: 'valor_total', type: 'decimal' })
    valorTotal: number;

    @Column({ name: 'valor_pagado', type: 'decimal' })
    valorPagado: number;

    @Column({ name: 'estado_pago', type: 'enum', enum: ['Pendiente', '50% Pagado', '100% Pagado'] })
    estadoPago: string;

    @Column({ name: 'estado_pedido', type: 'enum', enum: ['Pendiente', 'En Proceso', 'Terminado', 'Incidencia'] })
    estadoPedido: string;

    @OneToMany(() => Item, item => item.pedido, { eager: true })
    items: Item[];
}