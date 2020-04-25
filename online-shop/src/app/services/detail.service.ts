import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../models/product';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private messageSource = new BehaviorSubject<any>(Product);

  currentMessage = this.messageSource.asObservable();

  constructor( private http: HttpClient) { }

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
  getSmartphonesD(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/phones/');
  }

  getTabletsD(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/tablets/');
  }

  getWatchesD(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/watches/');
  }

  getAccessoriesD(id): Observable<Product> {
    return this.http.get<Product>('http://127.0.0.1:8000/api/products/' + id + '/');
  }
}
