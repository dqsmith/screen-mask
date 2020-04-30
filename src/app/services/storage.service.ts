import { Injectable } from '@angular/core';
import { IConfig } from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private key = 'screen-mask';
  private config: IConfig = {
    on: false,
    range: 75,
  };

  constructor() {}

  setConfig(config): void {
    this.config = config;

    localStorage.setItem(this.key, JSON.stringify(config));
  }

  getConfig(): IConfig {
    const config = localStorage.getItem(this.key);

    if (config) {
      return JSON.parse(config);
    }

    this.setConfig(this.config);

    return this.config;
  }
}
