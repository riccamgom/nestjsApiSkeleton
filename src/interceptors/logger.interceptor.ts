import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new DailyRotateFile({
      filename: 'logs/ccare-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const userAgente = req.headers['user-agent'] || '';
    const { ip, method, originalUrl } = req;
    winstonLogger.info(
      `**START INTERCEPTOR REQ LOG** - IP: ${ip} - Method: ${method} - URL: ${originalUrl} - User Agent: ${userAgente}`,
    );
    winstonLogger.info({ interceptorRequestBody: req.body });
    const now = Date.now();
    return next.handle().pipe(
      map(data => {
        winstonLogger.info({
          interceporResponse: data,
        });
        return data;
      }),
      tap(() => winstonLogger.info(`Tiempo ejecución: ${Date.now() - now}ms`)),
      //Add line to end log separation
      tap(() => winstonLogger.info('**END INTERCEPTOR REQ LOG**')),
    );
  }
}
