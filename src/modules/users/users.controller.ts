import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; - Esta aplicado globalmente
// El guard local de user y pass
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
//Services para la logica de negocio y consultas a la base de datos
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
//Decoradores personalizados para marcar metodos como publicos y extraer datos del token
import { Public } from 'src/common/decorators/ispublic.decorator';
import { TokenUserData } from 'src/common/decorators/userTokenData.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  //Este metodo es publico por el decorador personalizado
  //Pero usa el guard local de user y pass
  //El guard de JWT esta aplicado globalmente en el app.module
  @Public()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body) {
    return body;
  }

  //Usamos el guard local de user y pass que va a llamar al users.service antes de entrar al metodo
  //Si el usuario y pass son correctos, devuelve un JWT
  @Public()
  @Post('auth/loginjwt')
  @UseGuards(LocalAuthGuard)
  async jwtLogin(@Body() body) {
    return this.authService.login(body);
  }

  //Devuelve el body, el header de autorizacion y los datos del usuario extraidos del token con el decorador personalizado
  @Get('profile')
  getprofile(
    @Body() body,
    @Headers('Authorization') authHeader: string,
    @TokenUserData() user: any,
  ) {
    return { body, authHeader, user };
  }
}
