import {Component, Input, OnInit} from '@angular/core';
import {MessengerService} from '../../../../services/messenger.service';
import {Product} from '../../../../models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any;
  productList: Product[] = [];

  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
    this.getItem() ;
  }
  getItem() {
    this.msg.getItem()
      .subscribe(productList => this.productList = productList);
  }
  deleteC(id) {
    this.msg.deleteItem(id).subscribe();
    alert('Product with id: ' + id + ' was deleted');
    window.location.reload();
  }


}
