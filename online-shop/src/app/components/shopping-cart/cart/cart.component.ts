import { Component, OnInit } from '@angular/core';
import { MessengerService} from '../../../services/messenger.service';
import {Product} from '../../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  count: number;
  cartItems = [
    // {id: 1, productId: 1, productName: 'test 1',  qty: 4, price: 100},
    // {id: 2, productId: 3, productName: 'test 2',  qty: 1, price: 200},
    // {id: 3, productId: 5, productName: 'test 4',  qty: 2, price: 300},
    // {id: 4, productId: 7, productName: 'test 3',  qty: 1, price: 400},
  ];

  cartTotal = 0;

  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
     this.getCount();
  }
  getCount() {
    this.msg.getCount()
      .subscribe(count => this.count = count);
  }
  addProductToCart(product: Product) {

    let productExists = false;

    for (const i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price
      });
    }

    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
  }

}
