import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
register;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.register = {
      username: '',
      password: '',
      email: ''
    };
  }

  registerUser() {
    this.userService.registerUser(this.register).subscribe(
      response => {
        alert( 'User ' + this.register.username + ' has be registered!');
      },
      error => console.log('error', error)
    );
  }
}
