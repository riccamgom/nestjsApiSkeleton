import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
//Security
import helmet from 'helmet';

async function bootstrap() {
  //Enable CORS: Cross-Origin Resource Sharing allows resources to be requested from another domain
  const app = await NestFactory.create(AppModule, { cors: true });
  //Get variables from .env file
  const configService = app.get(ConfigService);
  //Enable helmet for security
  app.use(helmet());
  await app.listen(configService.get('PORT'));
}
bootstrap();
