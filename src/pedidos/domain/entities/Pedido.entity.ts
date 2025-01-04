import { ClienteEntity } from "src/clientes/domain/entities/Cliente.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./Item.entity";

@Entity({ name: 'pedidos' })
export class PedidoEntity {
    @PrimaryGeneratedColumn({ name: 'id_pedido', type: 'int' })
    idPedido: number;

    @ManyToOne(() => ClienteEntity, cliente => cliente.idCliente, { eager: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente: ClienteEntity;

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

    @ManyToMany(() => ItemEntity, item => item.idItem, { eager: true })
    @JoinTable({
        name: 'items_pedidos',
        joinColumn: { name: 'id_pedido', referencedColumnName: 'idPedido' },
        inverseJoinColumn: { name: 'id_item', referencedColumnName: 'idItem' }
    })
    items: ItemEntity[];
}