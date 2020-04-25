import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:no-shadowed-variable
  username: '';
  password: '';
  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
  }
  login() {

  }


}
