import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from '../domain/entities/pedido.entity';
import { EntityManager, Repository } from 'typeorm';
import { PedidoRegister } from '../domain/dto/PedidoRegister.dto';
import { ItemsService } from './items.service';
import { ClienteEntity } from 'src/clientes/domain/entities/Cliente.entity';

@Injectable()
export class PedidosService {
    constructor(
        @InjectEntityManager('main')
        private entityManager: EntityManager,
        @InjectRepository(PedidoEntity, 'main')
        private readonly pedidoRepository: Repository<PedidoEntity>,
        @InjectRepository(ClienteEntity, 'main')
        private readonly clienteRepository: Repository<ClienteEntity>,
        private readonly itemService: ItemsService
    ) {}

    async findAll(): Promise<PedidoEntity[]> {
        return this.pedidoRepository.find();
    }

    async findOne(idPedido: number): Promise<PedidoEntity> {
        return await this.pedidoRepository.findOneBy({ idPedido });
    }

    async createPedido(pedido: PedidoRegister): Promise<any> {
        try {
            return this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
                const cliente: ClienteEntity = await this.clienteRepository.findOneBy({ idCliente: pedido.idCliente });
                if (!cliente) throw new NotFoundException('Cliente no existe');

                const items = await this.itemService.createItems(pedido.items);
                const pedidoEntity = new PedidoEntity();
                pedidoEntity.cliente = cliente;
                pedidoEntity.evento = pedido.evento;
                pedidoEntity.fechaPedido = pedido.fechaPedido;
                pedidoEntity.fechaEntrega = pedido.fechaEntrega;
                pedidoEntity.valorTotal = pedido.valorTotal;
                pedidoEntity.valorPagado = pedido.valorPagado;
                pedidoEntity.estadoPago = pedido.estadoPago;
                pedidoEntity.estadoPedido = pedido.estadoPedido;
                pedidoEntity.items = items;

                return await this.pedidoRepository.save(pedidoEntity);
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
