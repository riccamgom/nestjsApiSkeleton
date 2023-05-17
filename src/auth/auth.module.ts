//Nest modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//Users own module
import { UsersModule } from 'src/modules/users/users.module';
//Config
import { ConfigModule, ConfigService } from '@nestjs/config';
//Auth own files
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          algorithm: 'HS512',
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
