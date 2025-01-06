import { BadRequestException, Body, ClassSerializerInterceptor, Controller, FileTypeValidator, Get, HttpStatus, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductoDto } from './dto/create-producto.dto';

@Controller('productos')
@ApiTags('Productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ 
        status: 200, 
        description: 'Productos encontrados', 
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    idProducto: { type: 'number' },
                    nombre: { type: 'string' },
                    descripcion: { type: 'string' },
                    precio: { type: 'number' },
                    imagenes: { type: 'array', items: { type: 'string' } },
                    categorias: { 
                        type: 'array', 
                        items: { 
                            type: 'object', 
                            properties:  {
                                idCategoria: { type: 'number' },
                                nombre: { type: 'string' }
                            }
                        } 
                    }
                }
            }
        }
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll() {
        return await this.productosService.findAll();
    }
    
    @Get(':idProducto')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiParam({  name: 'idProducto', description: 'ID del producto', schema: { type: 'number' } })
    @ApiResponse({ 
        status: 200, 
        description: 'Producto encontrado', 
        schema:  {
            type: 'object',
            properties: {
                idProducto: { type: 'number' },
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
                precio: { type: 'number' },
                imagenes: { type: 'array', items: { type: 'string' } },
                categorias: { 
                    type: 'array', 
                    items: { 
                        type: 'object', 
                        properties:  {
                            idCategoria: { type: 'number' },
                            nombre: { type: 'string' }
                        }
                    } 
                }
            }
        }
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(idProducto: number) {
        return await this.productosService.findOne(idProducto);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un producto' })
    @ApiBody({ 
        type: 'object', 
        description: 'Datos del producto',
        required: true,
        schema: {
            type: 'object',
            properties: {
                producto: { 
                    type: 'string',
                    format: 'json',
                    example: JSON.stringify({ 
                        nombre: 'Producto 1', 
                        descripcion: 'Descripción del producto', 
                        precio: 1000, 
                        categorias: [1, 2] 
                    })
                },
                files: {
                    type: 'array',
                    items: { type: 'file' }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Producto creado', 
        schema:  {
            type: 'object',
            properties: {
                idProducto: { type: 'number' },
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
                precio: { type: 'number' },
                imagenes: { type: 'array', items: { type: 'string' } },
                categorias: { 
                    type: 'array', 
                    items: { 
                        type: 'object', 
                        properties:  {
                            idCategoria: { type: 'number' },
                            nombre: { type: 'string' }
                        }
                    } 
                }
            }
        }
    })
    @UseInterceptors(
        FilesInterceptor('files', 10, {
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
        })
    )
    async create(
        @Body('producto') producto: string, 
        @UploadedFiles(new ParseFilePipe({ 
            validators: [ new FileTypeValidator({ fileType: /^image/ }) ] 
        })) files: Array<Express.Multer.File>
    ) {
        if (!files || files.length === 0) throw BadRequestException.createBody(null, 'No se han subido archivos', HttpStatus.BAD_REQUEST);
        const fileNames = files.map(file => file.filename);
        let createProductoDto: CreateProductoDto;

        try {
            const parseData = JSON.parse(producto);
            createProductoDto = Object.assign(new CreateProductoDto(), parseData);

            if (
                !createProductoDto.nombre || 
                !createProductoDto.descripcion || 
                !createProductoDto.precio || 
                !Array.isArray(createProductoDto.categorias)
            ) {
                await this.deleteFiles(fileNames);
                throw BadRequestException.createBody(null, 'Faltan campos obligatorios', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            await this.deleteFiles(fileNames);
            throw BadRequestException.createBody(null, 'El cuerpo de la petición no es válido', HttpStatus.BAD_REQUEST);
        }

        
        return await this.productosService.create(createProductoDto, fileNames);
    }

    /* Eliminar Imágenes Subidas */
    private async deleteFiles(fileNames: string[]) {
        const filePaths = fileNames.map(fileName => path.join(__dirname, '..', '..', 'uploads', fileName));
        for (const filePath of filePaths) {
            try {
                await fs.unlink(filePath);
            } catch (error) {
                console.error(`Error eliminando archivo: ${filePath}`);
            }
        }
    }
}