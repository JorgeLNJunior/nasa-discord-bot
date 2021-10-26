import dotenv from 'dotenv';
dotenv.config();

export class EnvService {
  get<T>(key: string): T {
    return process.env[key] as unknown as T;
  }
}
