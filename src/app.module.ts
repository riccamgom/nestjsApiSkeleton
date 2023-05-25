//Nestjs modules
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//Auth and guards for all routes (except the ones with the @Public decorator)
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
//Config to load the .env file
import configuration from 'src/common/config/configuration';
import { ConfigService } from '@nestjs/config';
//Middleware for all routes or defined routes and methods
import { ExampleMiddleware } from 'src/middleware/example.middleware';
//Filter to catch all the http exceptions
import { httpExceptionFilter } from './filters/httpExceptionFilter.filter';
//Throttler to limit the number of requests per user
import { ThrottlerModule } from '@nestjs/throttler';
//TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
//Modules of the app that contain the controllers and services
import { PatientsModule } from './modules/patients/patients.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PatientsModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, //This makes the config module available to all the app (import configservice)
      cache: true, //This makes the config module cache the config files, so it doesn't have to read them every time
      load: [configuration], //You can load more than one config file and make all variables available to the app
      envFilePath: ['.env.local', '.env.prod', '.env.docker'], //In production, if it doesn't find the .env.local file, it will use the .env.prod file, so just upload the .env.prod file to the server
    }),
    ThrottlerModule.forRoot({
      ttl: 60, //This is the time in seconds that the user will be blocked if it exceeds the limit
      limit: 10, //This is the number of requests per user in the ttl time
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', //This is the database driver, we can change it if we install first the package
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize'), //!This creates the tables in the database if they don't exist (only in development)
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD, //This applies the JwtAuthGuard to all the routes of the app
      useClass: JwtAuthGuard,
    },
    {
      provide: 'APP_FILTER', //This catches all the http exceptions in the app and returns a custom response
      useClass: httpExceptionFilter,
    },
  ],
})
export class AppModule {
  //This applies the middleware to all the routes of the app. You can also apply it to specific routes or methods (GET, POST..)('*' means all routes)
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes('*');
  }
}
