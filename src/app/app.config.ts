import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';
import { routes } from './app.routes';

const dbConfig: DBConfig  = {
  name: 'UrlDb',
  version: 1,
  objectStoresMeta: [{
    store: 'links',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'new_url', keypath: 'new_url', options: { unique: true } },
      { name: 'old_url', keypath: 'old_url', options: { unique: false } }
    ]
  }]
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideIndexedDb(dbConfig)]
};
