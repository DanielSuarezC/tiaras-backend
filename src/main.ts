import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('tiaras/api');
  
  /* ValidarioPip
   * Whitelist: Solo acepta los campos que estén en el DTO.
   * forbidNonWhitelisted: No acepta campos que no estén en el DTO.
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })); /* El Fernando dijo: Es bien importante y hay que utilizarla */

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
