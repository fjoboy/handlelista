import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl = "/api/items"; 

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get(this.itemsUrl);
  }

}
