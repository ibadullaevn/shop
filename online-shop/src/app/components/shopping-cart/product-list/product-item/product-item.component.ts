import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../../../../models/product';
import {MessengerService} from '../../../../services/messenger.service';
import {Router} from '@angular/router';
import {DetailService} from '../../../../services/detail.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;

  // tslint:disable-next-line:variable-name
  constructor(private msg: MessengerService, private detail: DetailService) { }

  ngOnInit(): void {
  }
  handleAddToCart() {
    this.msg.sendMsg(this.productItem);
  }

  viewDetail() {
    this.detail.changeMessage(this.productItem);
  }
}
