import { Injectable } from '@nestjs/common';

// Esto sera una entidad de typeorm
export type User = any;

@Injectable()
export class UsersService {
  //Mock de la base de datos
  private readonly users = [
    {
      userId: 1,
      username: 'luis',
      password: 'pass1',
      role: 'admin',
      company: 'company1',
      team: 'team1',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'pass2',
      role: 'manager',
      company: 'company2',
      team: 'team2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
