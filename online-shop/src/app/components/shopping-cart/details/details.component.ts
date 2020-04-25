import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {DetailService} from '../../../services/detail.service';
import {ProductService} from '../../../services/product.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() product: any;
  productList: Product;

  constructor(private location: Location, private detail: DetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getView() ;
  }
  getView() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.detail.getAccessoriesD(id).subscribe(productList => this.productList = productList);
  }
  goBack() {
    this.location.back();
  }
}
