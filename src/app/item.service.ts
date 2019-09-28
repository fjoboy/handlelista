import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  // private testApiUrl = private itemsUrl = "http://localhost:5000/api/items"; 
  private itemsUrl = "/api/items"; 

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.itemsUrl);
  }

  deleteItem(id: string): Observable<{}>{
    const url = `${this.itemsUrl}/${id}`;
    return this.http.delete(url);
  }

  deleteAllItems(): Observable<{}>{
    return this.http.delete(this.itemsUrl);
  }

  addItem(item: Item): Observable<Item>{
    return this.http.post<Item>(this.itemsUrl, item);
  }

}
