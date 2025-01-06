import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Cliente } from '../entities/Cliente.entity';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente, 'main')
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  /* Obtener todos los Clientes */
  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  /* Obtener un Cliente por ID */
  async findOne(idCliente: number): Promise<Cliente> {
    return await this.clienteRepository.findOneBy({ idCliente });
  }

  /* Crear un Cliente */
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new Cliente();
    Object.assign(cliente, createClienteDto);

    return await this.clienteRepository.save(cliente);
  }

  /* Actualizar un Cliente */
  async update(idCliente: number, updateClienteDto: UpdateClienteDto): Promise<UpdateResult> {
    const clienteToUpdate = await this.clienteRepository.findOneBy({ idCliente });
    if (!clienteToUpdate) throw NotFoundException;

    Object.assign(clienteToUpdate, updateClienteDto);
    
    return await this.clienteRepository.update(idCliente, clienteToUpdate);
  }
}
