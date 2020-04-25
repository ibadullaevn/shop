import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  signUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    this.dialog.open(RegisterComponent);
  }

}
