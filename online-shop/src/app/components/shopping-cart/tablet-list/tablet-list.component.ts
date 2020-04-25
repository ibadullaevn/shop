import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-tablet-list',
  templateUrl: './tablet-list.component.html',
  styleUrls: ['./tablet-list.component.css']
})
export class TabletListComponent implements OnInit {

  productList: Product[] = [];
  item: Product;

  constructor(private productService: ProductService, private msg: MessengerService) { }

  ngOnInit(): void {
    this.getTablet() ;
  }
  getTablet() {
    this.productService.getTablets()
      .subscribe(productList => this.productList = productList);
  }
  delete(id) {
    this.productService.deleteProduct(id).subscribe();
    alert('Product with id: '+ id+ ' was deleted');
    window.location.reload();
  }
  AddToCart(item) {
    this.msg.addToCart(item).subscribe();
    window.location.reload();
  }

}
