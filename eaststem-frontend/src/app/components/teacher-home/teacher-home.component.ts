import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/user';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
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