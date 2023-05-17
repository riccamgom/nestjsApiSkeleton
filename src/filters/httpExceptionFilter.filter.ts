import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch()
export class httpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(httpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.log('Exception http catch filter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const request = ctx.getRequest();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
