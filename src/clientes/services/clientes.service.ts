import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from '../domain/entities/Cliente.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ClienteRegister } from '../domain/dto/ClienteRegister.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(ClienteEntity, 'main')
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  /* Obtener todos los Clientes */
  async findAll(): Promise<ClienteEntity[]> {
    return await this.clienteRepository.find();
  }

  /* Obtener un Cliente por ID */
  async findOne(idCliente: number): Promise<ClienteEntity> {
    return await this.clienteRepository.findOneBy({ idCliente });
  }

  /* Crear un Cliente */
  async create(cliente: ClienteRegister): Promise<ClienteEntity> {
    const clienteEntity = new ClienteEntity();
    clienteEntity.nombre = cliente.nombre;
    clienteEntity.apellidos = cliente.apellidos;
    clienteEntity.telefono = cliente.telefono;
    clienteEntity.email = cliente.email;
    clienteEntity.pais = cliente.pais;
    clienteEntity.ciudad = cliente.ciudad;

    return await this.clienteRepository.save(clienteEntity);
  }

  /* Actualizar un Cliente */
  async update(idCliente: number, cliente: ClienteRegister): Promise<UpdateResult> {
    const clienteToUpdate = await this.clienteRepository.findOneBy({ idCliente });
    if (!clienteToUpdate) throw NotFoundException;

    clienteToUpdate.nombre = cliente.nombre;
    clienteToUpdate.apellidos = cliente.apellidos;
    clienteToUpdate.telefono = cliente.telefono;
    clienteToUpdate.email = cliente.email;
    clienteToUpdate.pais = cliente.pais;
    clienteToUpdate.ciudad = cliente.ciudad;
    
    return await this.clienteRepository.update(idCliente, clienteToUpdate);
  }
}
