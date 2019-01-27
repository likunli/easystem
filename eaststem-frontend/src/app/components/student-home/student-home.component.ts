import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User} from '../../entities/user';
import { Router} from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})

export class StudentHomeComponent implements OnInit {
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
