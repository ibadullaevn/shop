import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category, LoginResponse} from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL = 'http://127.0.0.1:8000'
  categories: Category[] = [
    new Category(1, 'smartphones'),
    new Category(2, 'tablets'),
    new Category(3, 'watches'),
    new Category(4, 'accessories')
  ];

  constructor(private http: HttpClient) { }

  getCategoriesList() {
    return this.http.get<Category[]>('http://127.0.0.1:8000/api/categories/');
  }
  login(username, password): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/api/login/`, {
      username,
      password
    });
  }

}


