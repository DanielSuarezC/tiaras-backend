import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './clientes/domain/entities/Cliente.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioAuthEntity } from './auth/domain/entities/UsuarioAuth.entity';
import { RolAuthEntity } from './auth/domain/entities/RolAuth.entity';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'tiaras_authentication',
        entities: [UsuarioAuthEntity, RolAuthEntity],
        autoLoadEntities: true,
        synchronize: true
      }),
      name: 'auth'
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'tiaras_main',
        entities: [ClienteEntity],
        autoLoadEntities: true,
        synchronize: true
      }),
      name: 'main'
    }),
    ClientesModule,
    AuthModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
