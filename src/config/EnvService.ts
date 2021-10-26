import dotenv from 'dotenv';
dotenv.config();

export class EnvService {
  get<T>(key: string): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return process.env[key] as any as T;
  }
}
