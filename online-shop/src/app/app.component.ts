import {Component, OnInit} from '@angular/core';
import {CategoryService} from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'online-shop';
  logged = false;
  username = '';
  password = ''
  constructor(private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;

    }
  }

  login() {
    this.categoryService.login(this.username, this.password)
      .subscribe(res => {
        alert('Dear ' + this.username + ' Welcome!');
        localStorage.setItem('token', res.token);

        this.logged = true;

        this.username = '';
        this.password = '';
      });
  }
  logout() {
    localStorage.clear();
    this.logged = false;
  }

}
