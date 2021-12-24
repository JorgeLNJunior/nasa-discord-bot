import { AxiosInstance } from 'axios';

import { EnvService } from '../config/EnvService';
import { ApodApiResponse } from './types/apod.types';

export class ApodApi {
  constructor(private envService: EnvService, private axios: AxiosInstance) { }

  async find() {
    const NASA_KEY = this.envService.get<string>('NASA_API_KEY');
    const API_URL = 'https://api.nasa.gov/planetary/apod';

    const response = await this.axios.get(`${API_URL}?api_key=${NASA_KEY}`);

    return response.data as ApodApiResponse;
  }
}
