//Nestjs modules
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ParseBoolPipe, ParseIntPipe } from '@nestjs/common/pipes';
//Para usar variables de entorno de configuration.ts
import { ConfigService } from '@nestjs/config';
//DTOs para tipar los datos
import { createPatientDto } from './dto/createPatient.dto';
//Service para la logica de negocio y consultas a la base de datos
import { PatientsService } from './patients.service';
//Decorador personalizado para marcar metodos como publicos
import { Public } from 'src/common/decorators/ispublic.decorator';
//Para pasar la request por un pipe de validacion personalizado -> @Body(examplePipe)
import { examplePipe } from 'src/pipes/examplePipe.pipe';
//Para añadir al archivo log tanto las peticiones como las respuestas -> @UseInterceptors(LoggerInterceptor)
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';

@Controller('patients')
export class PatientsController {
  constructor(
    private patientService: PatientsService,
    private configService: ConfigService,
  ) {}

  //Decorador public personalizado para que no aplique el guard de JWT (aplicado en app.module globalmente)
  @Public()
  @Get()
  getPatients() {
    //Como usar variables de entorno de congifuration.ts
    console.log(
      'Config object test:',
      this.configService.get('datotest02', 'Uso esto si no hay dato'),
    );
    console.log(
      'Config object test:',
      this.configService.get('objetotest01.datodentroobjeto'),
    );
    return this.patientService.fetchPatients();
  }

  @Post()
  //Llamamos al interceptor para que añada al archivo log tanto las peticiones como las respuestas
  @UseInterceptors(LoggerInterceptor)
  //Llamamos al pipe de validacion para que valide los datos de entrada segun el DTO
  @UsePipes(new ValidationPipe())
  //Hacemos pasar el body al que llamamos patientData de tipo createPatientDto  por un pipe personalizado
  createPatient(@Body(examplePipe) patientData: createPatientDto) {
    console.log(patientData);
    return { message: 'This action create new patient' };
  }

  // Los parametros siempre son strings, se pueden parsear con los pipes (ParseIntPipe, ParseBoolPipe)
  @Get(':id/:post')
  getPatientbyId(
    @Param('id', ParseIntPipe) id: number,
    @Param('post') post: string,
  ) {
    console.log(id, post);
    const user = this.patientService.fetchPatientbyId(id);
    if (!user) {
      throw new HttpException('Patient not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  // Los query params vienen de una URL asi (/filter?dataFilter=data1) y tambien son strings
  @Get('/filter')
  filterPatients(@Query('dataFilter', ParseBoolPipe) filterVar: boolean) {
    console.log(filterVar);
    return [{ username: 'Test', email: 'test@test.com' }];
  }
}
