import { EnvService } from '../../src/config/EnvService';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(() => {
    service = new EnvService();
  });


  test('should return the value from an environment variable', async () => {
    const result = service.get<string>('TEST_VAR');
    expect(result).toBe('foo');
  });
});
