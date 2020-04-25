import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  productList: Product[] = [];
  item: Product;


  constructor(private productService: ProductService, private msg: MessengerService) { }

  ngOnInit(): void {
    this.getWatch() ;
  }
  getWatch() {
    this.productService.getWatches()
      .subscribe(productList => this.productList = productList);
  }
  handleAddToCart() {
    this.msg.sendMsg(this.productList);
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
