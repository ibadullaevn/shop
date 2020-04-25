import { Component, OnInit } from '@angular/core';
import {MessengerService} from '../../../services/messenger.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filter;
  min;
  max;

  constructor(private msg: MessengerService) { }

  ngOnInit(): void {
    this.filter = {
      min_price: '3000',
      max_price: '50000'
    };
  }
  filters() {
    this.msg.filter(this.filter).subscribe();
    alert('Products are filtered');
    window.location.reload();
  }
}
