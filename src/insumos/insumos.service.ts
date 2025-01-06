import { Injectable } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsumosService {
  constructor(
    @InjectRepository(Insumo, 'main')
    private readonly insumoRepository: Repository<Insumo>
  ) {}

  create(createInsumoDto: CreateInsumoDto, imagen: string) {
    const insumo = new Insumo();
    insumo.nombre = createInsumoDto.nombre;
    insumo.descripcion = createInsumoDto.descripcion;
    insumo.tipo = createInsumoDto.tipo;
    insumo.imagen = imagen;
    insumo.unidadMedida = createInsumoDto.unidadMedida;

    return this.insumoRepository.save(insumo);
  }

  findAll() {
    return this.insumoRepository.find();
  }

  findOne(id: number) {
    return this.insumoRepository.findOneBy({ idInsumo: id });
  }

  update(id: number, updateInsumoDto: UpdateInsumoDto) {
    return `This action updates a #${id} insumo`;
  }

  remove(id: number) {
    return this.insumoRepository.delete(id);
  }
}
