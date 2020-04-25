import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DetailService} from '../../../services/detail.service';
import {MessengerService} from '../../../services/messenger.service';


@Component({
  selector: 'app-accessory-list',
  templateUrl: './accessory-list.component.html',
  styleUrls: ['./accessory-list.component.css']
})
export class AccessoryListComponent implements OnInit {

  productList: Product[] = [];
  item: Product;

  constructor(private msg: MessengerService, private productService: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAccessory() ;
  }
  getAccessory() {
    this.productService.getAccessories()
      .subscribe(productList => this.productList = productList);
  }
  delete(id) {
    this.productService.deleteProduct(id).subscribe();
    alert('Product with id: ' + id + ' was deleted');
    window.location.reload();
  }
  AddToCart(item) {
  this.msg.addToCart(item).subscribe();
  window.location.reload();
  }

}
