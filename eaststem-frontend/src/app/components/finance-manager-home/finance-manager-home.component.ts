import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/user';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-finance-manager-home',
  templateUrl: './finance-manager-home.component.html',
  styleUrls: ['./finance-manager-home.component.css']
})
export class FinanceManagerHomeComponent implements OnInit {

  private users: User[];
  private curUser: User;
  private isLogin: boolean;
  constructor(private _userService: UserService, private _router: Router) {
    if (localStorage.getItem('currentUser')) {
      this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.isLogin = this.curUser == null ? false : true;
   }

  ngOnInit() {
    this._userService.getUsers().subscribe((response)=> {
      console.log(response.data);
      this.users = response.data;
    }, (error)=> {
      console.log(error);
    })
  }

}
