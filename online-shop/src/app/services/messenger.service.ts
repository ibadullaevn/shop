import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject();
  category = new Subject();
  count: number;

  constructor(private http: HttpClient) { }

  sendMsg(product) {
    this.subject.next(product);
  }

  getMsg() {
    return this.subject.asObservable();
  }

  sendCatMsg(category) {
    this.category.next(category);
  }

  getCatMsg() {
    return this.category.asObservable();
  }
  getItem(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/cart/');
  }
  deleteItem(id): Observable<Product[]> {
    return this.http.delete<Product[]>('http://127.0.0.1:8000/api/cart/' + id + '/');
  }
  addToCart(productData: Product): Observable<Product> {
    return this.http.post<Product>('http://127.0.0.1:8000/api/cart/', productData);
  }
  getCount(): Observable<number> {
    return this.http.get<number>('http://127.0.0.1:8000/api/cart/count/');
  }
  filter(prices): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/products/?min_price=' + prices.min_price + '&max_price=' + prices.max_price, prices);
  }
  // filter(prices): Observable<any> {
  //   return this.http.post('http://127.0.0.1:8000/api/products/', prices);
  // }
}
