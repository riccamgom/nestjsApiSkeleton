import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
export class createPatientDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
