//Nestjs modules
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//Auth and guards for all routes (except the ones with the @Public decorator)
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
//Config to load the .env file
import configuration from 'src/common/config/configuration';
//Middleware for all routes or defined routes and methods
import { ExampleMiddleware } from 'src/middleware/example.middleware';
//Modules of the app that contain the controllers and services
import { PatientsModule } from './modules/patients/patients.module';
import { DevicesModule } from './modules/devices/devices.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PatientsModule,
    DevicesModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, //This makes the config module available to all the app (import configservice)
      cache: true, //This makes the config module cache the config files, so it doesn't have to read them every time
      load: [configuration], //You can load more than one config file and make all variables available to the app
      envFilePath: ['.env.local', '.env.prod'], //In production, if it doesn't find the .env.local file, it will use the .env.prod file, so just upload the .env.prod file to the server
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD, //This applies the JwtAuthGuard to all the routes of the app
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  //This applies the middleware to all the routes of the app. You can also apply it to specific routes or methods (GET, POST..)('*' means all routes)
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes('*');
  }
}
