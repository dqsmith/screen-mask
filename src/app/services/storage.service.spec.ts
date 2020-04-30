import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { IConfig } from '../interfaces/config.interface';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
  });

  afterEach(() => {
    localStorage.removeItem('screen-mask');
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should set a configuration', inject([StorageService], (service: StorageService) => {
    const config: IConfig = {
      on: true,
      range: 50,
    };

    service.setConfig(config);

    const storedConfig = localStorage.getItem('screen-mask');
    expect(JSON.parse(storedConfig)).toEqual(config);
  }));

  it('should get a configuration', inject([StorageService], (service: StorageService) => {
    const config: IConfig = {
      on: true,
      range: 50,
    };

    service.setConfig(config);

    const value = service.getConfig();
    expect(value).toEqual(config);
  }));

  it('should return a default config if none has been stored', inject([StorageService], (service: StorageService) => {
    const defaultConfig: IConfig = {
      on: false,
      range: 75,
    };

    localStorage.removeItem('screen-mask');

    const value = service.getConfig();
    expect(value).toEqual(defaultConfig);
  }));

  it('should return a stored config if it exists', inject([StorageService], (service: StorageService) => {
    const config: IConfig = {
      on: true,
      range: 50,
    };

    const storedConfig = Object.assign(config, { range: 100 });

    service.setConfig(config);

    let value = service.getConfig();
    expect(value).toEqual(config);

    localStorage.setItem('screen-mask', JSON.stringify(storedConfig));

    value = service.getConfig();
    expect(value).toEqual(storedConfig);
  }));
});
