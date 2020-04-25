import { Component, OnInit } from '@angular/core';
import {Category} from '../../../../models/category';
import {PRODUCTS} from '../../../../products';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  product = PRODUCTS;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {

    this.productService.getCategory()
      .subscribe(categories => this.categories = categories);
  }
}
