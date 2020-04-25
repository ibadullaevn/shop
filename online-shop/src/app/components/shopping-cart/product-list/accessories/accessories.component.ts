import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../../product';
import {Category} from '../../../../models/category';
import {CATEGORIES} from '../../../../models/categories';
import {PRODUCTS} from '../../../../products';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  products: Product[];
  PRODUCTS = PRODUCTS;

  constructor(private location: Location,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }
}
