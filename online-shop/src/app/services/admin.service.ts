import { Injectable } from '@angular/core';
import {Admin} from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminchik: Admin[] = [
    {id: 1, name: 'Daniyar'}
  ];
  constructor() { }
}
