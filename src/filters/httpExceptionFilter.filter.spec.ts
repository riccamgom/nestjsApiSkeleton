import { httpExceptionFilter } from './httpExceptionFilter.filter';

describe('FiltersFilter', () => {
  it('should be defined', () => {
    expect(new httpExceptionFilter()).toBeDefined();
  });
});
