import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { ParticipantModule } from './participant/participant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Отключаем синхронизацию
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    UsersModule, EventModule, ParticipantModule],
})
export class AppModule {}
