import axios, { AxiosInstance } from 'axios';

import { ApodApi } from '../../src/api/apod.api';
import { EnvService } from '../../src/config/EnvService';
import { fakeApod } from '../fakes';

describe('ApodApi', () => {
  let apodApi: ApodApi;
  let axiosInstance: AxiosInstance;
  let envService: EnvService;

  beforeEach(() => {
    axiosInstance = axios.create();
    envService = new EnvService();
    apodApi = new ApodApi(envService, axiosInstance);
  });

  test('should return a APOD', async () => {
    const jestSpy = jest.spyOn(axiosInstance, 'get')
      .mockImplementation(() => Promise.resolve({ data: fakeApod }));
    const envSpy = jest.spyOn(envService, 'get');

    const apod = await apodApi.find();

    expect(apod).toEqual(fakeApod);
    expect(jestSpy).toBeCalledTimes(1);
    expect(envSpy).toBeCalledTimes(1);
  });
});
