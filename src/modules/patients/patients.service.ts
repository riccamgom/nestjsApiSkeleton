import { Injectable } from '@nestjs/common';
import { createPatientDto } from './dto/createPatient.dto';

@Injectable()
export class PatientsService {
  //Mock de la base de datos
  private testPatients = [
    { username: 'hola', email: 'hola@hola.com' },
    { username: 'adios', email: 'adios@adios.com' },
  ];

  fetchPatients() {
    return this.testPatients;
  }

  createPatient(patientData: createPatientDto) {
    this.testPatients.push(patientData);
    return this.testPatients;
  }

  fetchPatientbyId(id: number) {
    return { id: id, username: 'adios', email: 'adios@adios.com' };
  }
}
