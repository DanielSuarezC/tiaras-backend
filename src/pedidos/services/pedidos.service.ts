import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ItemsService } from './items.service';
import { Pedido } from '../entities/Pedido.entity';
import { Cliente } from 'src/clientes/entities/Cliente.entity';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Injectable()
export class PedidosService {
    constructor(
        @InjectEntityManager('main')
        private entityManager: EntityManager,
        @InjectRepository(Pedido, 'main')
        private readonly pedidoRepository: Repository<Pedido>,
        @InjectRepository(Cliente, 'main')
        private readonly clienteRepository: Repository<Cliente>,
        private readonly itemService: ItemsService
    ) {}

    async findAll(): Promise<Pedido[]> {
        return this.pedidoRepository.find({ relations: ['items'] });
    }

    async findOne(idPedido: number): Promise<Pedido> {
        return await this.pedidoRepository.findOne({ where: { idPedido }, relations: ['items'] });
    }

    async createPedido(createPedidoDto: CreatePedidoDto): Promise<any> {
        try {
            return this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
                const cliente: Cliente = await this.clienteRepository.findOneBy({ idCliente: createPedidoDto.idCliente });
                if (!cliente) throw new NotFoundException('Cliente no existe');

                const items = await this.itemService.createItems(createPedidoDto.items);
                const pedido = new Pedido();
                pedido.cliente = cliente;
                pedido.evento = createPedidoDto.evento;
                pedido.fechaPedido = createPedidoDto.fechaPedido;
                pedido.fechaEntrega = createPedidoDto.fechaEntrega;
                pedido.valorTotal = createPedidoDto.valorTotal;
                pedido.valorPagado = createPedidoDto.valorPagado;
                pedido.estadoPago = createPedidoDto.estadoPago;
                pedido.estadoPedido = createPedidoDto.estadoPedido;
                pedido.items = items;

                return await this.pedidoRepository.save(pedido);
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async updatePedido(idPedido: number, updatePedidoDto: UpdatePedidoDto): Promise<any> {
        try {
            return this.entityManager.transaction(async (transactionalEntityManager: EntityManager) => {
                const pedido: Pedido = await this.pedidoRepository.findOneBy({ idPedido });
                if (!pedido) throw new NotFoundException('Pedido no existe');

                const cliente: Cliente = await this.clienteRepository.findOneBy({ idCliente: updatePedidoDto.idCliente });
                if (!cliente) throw new NotFoundException('Cliente no existe');

                const items = await this.itemService.updateItems(updatePedidoDto.items);
                pedido.cliente = cliente;
                pedido.evento = updatePedidoDto.evento;
                pedido.fechaPedido = updatePedidoDto.fechaPedido;
                pedido.fechaEntrega = updatePedidoDto.fechaEntrega;
                pedido.valorTotal = updatePedidoDto.valorTotal;
                pedido.valorPagado = updatePedidoDto.valorPagado;
                pedido.estadoPago = updatePedidoDto.estadoPago;
                pedido.estadoPedido = updatePedidoDto.estadoPedido;
                pedido.items = items;

                return await this.pedidoRepository.update(idPedido, pedido);
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
