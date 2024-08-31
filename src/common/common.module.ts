import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';
import { ConfigProjModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        SwaggerModule,
        ConfigProjModule,
        DatabaseModule,
        AuthModule
    ],
})
export class CommonModule { }
