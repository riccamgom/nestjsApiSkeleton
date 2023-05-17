import { ExampleMiddleware } from './example.middleware';

describe('MiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new ExampleMiddleware()).toBeDefined();
  });
});
