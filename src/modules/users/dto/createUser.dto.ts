import { IsNotEmpty, IsEmail } from 'class-validator';
export class createUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}
