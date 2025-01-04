import { BadRequestException, Body, ClassSerializerInterceptor, Controller, FileTypeValidator, Get, HttpStatus, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductosService } from './services/productos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ProductoRegister } from './domain/dto/ProductoRegister.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('productos')
@ApiTags('Productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService
    ) {}

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll() {
        return await this.productosService.findAll();
    }
    
    @Get(':idProducto')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiBody({ type: Number, description: 'ID del producto' })
    @ApiResponse({ status: 200, description: 'Producto encontrado', content: { 'application/json': { example: { message: 'Producto Obtenido', data: { idProducto: 1 } } } } })
    @UseInterceptors(ClassSerializerInterceptor)
    async findOne(idProducto: number) {
        return await this.productosService.findOne(idProducto);
    }

    @Post()
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
            validators: [ 
                new FileTypeValidator({ fileType: /^image/ }) 
                ] 
        })) files: Array<Express.Multer.File>
    ) {
        if (!files || files.length === 0) throw BadRequestException.createBody(null, 'No se han subido archivos', HttpStatus.BAD_REQUEST);
        const fileNames = files.map(file => file.filename);
        let productoRegister: ProductoRegister;

        try {
            const parseData = JSON.parse(producto);
            productoRegister = Object.assign(new ProductoRegister(), parseData);

            if (
                !productoRegister.nombre || 
                !productoRegister.descripcion || 
                !productoRegister.precio || 
                !Array.isArray(productoRegister.categorias)
            ) {
                await this.deleteFiles(fileNames);
                throw BadRequestException.createBody(null, 'Faltan campos obligatorios', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            await this.deleteFiles(fileNames);
            throw BadRequestException.createBody(null, 'El cuerpo de la petición no es válido', HttpStatus.BAD_REQUEST);
        }

        
        return await this.productosService.create(productoRegister, fileNames);
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