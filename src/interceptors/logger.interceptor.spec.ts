import { LoggerInterceptor } from './logger.interceptor';

describe('InterceptorsInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggerInterceptor()).toBeDefined();
  });
});
