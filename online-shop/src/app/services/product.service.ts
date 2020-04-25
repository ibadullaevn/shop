import {Injectable} from '@angular/core';

import {Product} from '../models/product';
import {CATEGORIES} from '../models/categories';
import {Category} from '../models/category';

import {Observable, of, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    new Product(1, 1, 'Product 1', 'This is the product 1 description. The product is really cool!', 100),
    new Product(2, 1, 'Product 2', 'This is the product 2 description. The product is really cool!', 250),
    new Product(3, 1, 'Product 3', 'This is the product 3 description. The product is really cool!', 150),
    new Product(4, 2, 'Product 4', ',This is the product 4 description. The product is really cool!', 1450),
    new Product(5, 2, 'Product 5', 'This is the product 5 description. The product is really cool!', 8480),
    new Product(6, 2, 'Product 6', 'This is the product 6 description. The product is really cool!', 840),
    new Product(7, 3, 'Product 7', 'This is the product 7 description. The product is really cool!', 1480),
    new Product(8, 3, 'Product 8', 'This is the product 8 description. The product is really cool!', 1770),
    new Product(9, 4, 'Product 9', 'This is the product 9 description. The product is really cool!', 10480),
    new Product(10, 4, 'Product 10', 'This is the product 10 description. The product is really cool!', 14840)
  ];

  smartphones: Product[] = [
    new Product(1, 1, 'Smartphone 1', 'This is the product 1 description. The product is really cool!', 100, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(2, 1, 'Smartphone 2', 'This is the product 2 description. The product is really cool!', 250, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(3, 1, 'Smartphone 3', 'This is the product 3 description. The product is really cool!', 150, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(4, 1, 'Smartphone 4', ',This is the product 4 description. The product is really cool!', 1450, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(5, 1, 'Smartphone 5', 'This is the product 5 description. The product is really cool!', 8480, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(6, 1, 'Smartphone 6', 'This is the product 6 description. The product is really cool!', 840, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(7, 1, 'Smartphone 7', 'This is the product 7 description. The product is really cool!', 1480, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(8, 1, 'Smartphone 8', 'This is the product 8 description. The product is really cool!', 1770, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp'),
    new Product(9, 1, 'Smartphone 9', 'This is the product 9 description. The product is really cool!', 10480, 'https://ae01.alicdn.com/kf/HTB1dr2yFL5TBuNjSspcq6znGFXaj/Super-Shockproof-Clear-Soft-Case-for-iPhone-5-5S-6-7-8-Plus-6SPlus-8Plus-X.jpg_220x220xz.jpg_.webp')
  ];

  tablets: Product[] = [
    new Product(1, 2, 'Tablet 1', 'This is the product 1 description. The product is really cool!', 100, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(2, 2, 'Tablet 2', 'This is the product 2 description. The product is really cool!', 250, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(3, 2, 'Tablet 3', 'This is the product 3 description. The product is really cool!', 150, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(4, 2, 'Tablet 4', ',This is the product 4 description. The product is really cool!', 1450, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(5, 2, 'Tablet 5', 'This is the product 5 description. The product is really cool!', 8480, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(6, 2, 'Tablet 6', 'This is the product 6 description. The product is really cool!', 840, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(7, 2, 'Tablet 7', 'This is the product 7 description. The product is really cool!', 1480, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(8, 2, 'Tablet 8', 'This is the product 8 description. The product is really cool!', 1770, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp'),
    new Product(9, 2, 'Tablet 9', 'This is the product 9 description. The product is really cool!', 10480, 'https://ae01.alicdn.com/kf/Hf87aac2cfbd94091b2d13a814e4d6a3bb/2020-Android-9-0-Screen-Tablet-pcs-10-1-inch-4G-FDD-LTE-tablet-PC-10.jpg_220x220xz.jpg_.webp')
  ];

  watches: Product[] = [
    new Product(1, 3, 'Watch 1', 'This is the Watch 1 description. The product is really cool!', 100, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(2, 3, 'Watch 2', 'This is the Watch 2 description. The product is really cool!', 250, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(3, 3, 'Watch 3', 'This is the Watch 3 description. The product is really cool!', 150, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(4, 3, 'Watch 4', ',This is the Watch 4 description. The product is really cool!', 1450, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(5, 3, 'Watch 5', 'This is the Watch 5 description. The product is really cool!', 8480, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(6, 3, 'Watch 6', 'This is the Watch 6 description. The product is really cool!', 840, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(7, 3, 'Watch 7', 'This is the Watch 7 description. The product is really cool!', 1480, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(8, 3, 'Watch 8', 'This is the Watch 8 description. The product is really cool!', 1770, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp'),
    new Product(9, 3, 'Watch 9', 'This is the Watch 9 description. The product is really cool!', 10480, 'https://ae01.alicdn.com/kf/H16f5421956dc4bcab55e1b845a6798477/Bluetooth-Smart-font-b-Watch-b-font-Waterproof-Multi-Function-Supports-Dial-Answer-Call-Messages-Reminder.jpg_220x220xz.jpg_.webp')
  ];


  accessories: Product[] = [
    new Product(1, 4, 'Accessory 1', 'This is the product 1 description. The product is really cool!', 100, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(2, 4, 'Accessory 2', 'This is the product 2 description. The product is really cool!', 250, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(3, 4, 'Accessory 3', 'This is the product 3 description. The product is really cool!', 150, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(4, 4, 'Accessory 4', ',This is the product 4 description. The product is really cool!', 1450, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(5, 4, 'Accessory 5', 'This is the product 5 description. The product is really cool!', 8480, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(6, 4, 'Accessory 6', 'This is the product 6 description. The product is really cool!', 840, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(7, 4, 'Accessory 7', 'This is the product 7 description. The product is really cool!', 1480, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(8, 4, 'Accessory 8', 'This is the product 8 description. The product is really cool!', 1770, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp'),
    new Product(9, 4, 'Accessory 9', 'This is the product 9 description. The product is really cool!', 10480, 'https://ae01.alicdn.com/kf/He39d135a97a648de82c5b765e6335b2dr/Candy-Colors-Soft-Silicone-Case-For-Apple-Air-Pods-2-Cases-For-AirPods-2-Silm-Shockproof.jpg_220x220xz.jpg_.webp')
  ];
  BASE_URL = 'http://localhost:8000';

  getProducts(): Product[] {
    return this.products;
  }

  getSmartphones(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/phones/');
  }

  getTablets(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/tablets/');
  }

  getWatches(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/watches/');
  }

  getAccessories(): Observable<Product[]> {
    return this.http.get<Product[]>('http://127.0.0.1:8000/api/accessories/');
  }
  deleteProduct(id): Observable<Product[]> {
    return this.http.delete<Product[]>('http://127.0.0.1:8000/api/products/' + id + '/');
}
  constructor(private http: HttpClient) { }
}
