import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from './configurations';

@Module({
    imports: [
        // Import the ConfigModule
        ConfigModule.forRoot({
            load: [configurations],
            envFilePath: ['.env.local', '.env.uat', '.env.production'],
            isGlobal: true,
        })
    ],
})
export class ConfigProjModule {}
