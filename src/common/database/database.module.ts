import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // Handle entities path based on the environment
                const entitiesPath = configService.get('environment') === 'development' 
                ? 'src/entities/**/*{.ts,.js}' 
                : 'dist/entities/**/*{.ts,.js}';
                // Handle the entities path based on the environment
                const config: TypeOrmModuleOptions = {
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    schema: configService.get('database.schema'),
                    entities: [entitiesPath],
                    synchronize: false,
                    retryAttempts: 1,
                };

                console.log(config);

                return config;
            },
        })
    ],
})
export class DatabaseModule { }