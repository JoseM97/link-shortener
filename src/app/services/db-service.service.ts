import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private dbService: NgxIndexedDBService) { }

  addUrl(oldUrl: string){
    return this.dbService.add('links', oldUrl);
  }

  getUrls(){
    return this.dbService.getAll('links');
  }
}
