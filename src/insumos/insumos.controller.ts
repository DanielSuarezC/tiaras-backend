import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, BadRequestException, HttpStatus } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('insumos')
export class InsumosController {
  constructor(private readonly insumosService: InsumosService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo insumo' })
  @ApiBody({
    description: 'Insumo a crear',
    type: CreateInsumoDto
  })
  @ApiResponse({
    status: 201,
    description: 'Insumo creado',
    schema: {
      type: 'object',
      properties: {
        insumo: { 
          type: 'string',
          format: 'json',
          example: JSON.stringify({ 
              nombre: 'Producto 1', 
              descripcion: 'Descripción del producto', 
              tipo: 'Producción', 
              unidadMedida: 'Kg'
          })
        },
        imagen: { type: 'file' }
      }
    }
  })
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: (req, file, cb) => {
          const uploadPath = path.join(__dirname, '..', '..', 'uploads');
          cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = path.extname(file.originalname);
          const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
          cb(null, fileName);
      }
  })
  }))
  async create(@UploadedFile(new ParseFilePipe({ 
    validators: [
      new FileTypeValidator({ fileType: /^image/ })
    ] 
  })) imagen: Express.Multer.File, 
  @Body('insumo') createInsumoDto: string) {
    if (!imagen) throw new BadRequestException('No se ha subido una imagen');
    const fileName = imagen.filename;
    let insumoDto: CreateInsumoDto;

    try {
      const parseData = JSON.parse(createInsumoDto);
      insumoDto = Object.assign(new CreateInsumoDto(), parseData);

      if (
        !insumoDto.nombre || 
        !insumoDto.descripcion || 
        !insumoDto.tipo ||
        !insumoDto.unidadMedida
      ) {
          await this.deleteFile(fileName);
          throw BadRequestException.createBody(null, 'Faltan campos obligatorios', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      
    }

    return this.insumosService.create(insumoDto, fileName);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los insumos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de insumos',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idInsumo: { type: 'number' },
          nombre: { type: 'string' },
          descripcion: { type: 'string' },
          tipo: { type: 'string' },
          unidadMedida: { type: 'string' },
          imagen: { type: 'string' }
        }
      }
    }
  })
  findAll() {
    return this.insumosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un insumo por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del insumo',
    type: 'number'
  })
  @ApiResponse({
    status: 200,
    description: 'Insumo encontrado',
    schema: {
      type: 'object',
      properties: {
        idInsumo: { type: 'number' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        tipo: { type: 'string' },
        unidadMedida: { type: 'string' },
        imagen: { type: 'string' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.insumosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un insumo' })
  @ApiParam({
    name: 'id',
    description: 'ID del insumo',
    type: 'number'
  })
  @ApiBody({
    description: 'Datos a actualizar',
    type: UpdateInsumoDto
  })
  @ApiResponse({
    status: 200,
    description: 'Insumo actualizado',
    schema: {
      type: 'object',
      properties: {
        idInsumo: { type: 'number' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        tipo: { type: 'string' },
        unidadMedida: { type: 'string' },
        imagen: { type: 'string' }
      }
    }
  })
  update(@Param('id') id: string, @Body() updateInsumoDto: UpdateInsumoDto) {
    return this.insumosService.update(+id, updateInsumoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un insumo' })
  @ApiParam({
    name: 'id',
    description: 'ID del insumo',
    type: 'number'
  })
  @ApiResponse({
    status: 204,
    description: 'Insumo eliminado'
  })
  remove(@Param('id') id: string) {
    return this.insumosService.remove(+id);
  }

  private async deleteFile(fileName: string) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error(`Error eliminando archivo: ${filePath}`);
    }
  }
}