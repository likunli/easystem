import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  constructor(private _userService: UserService, private _router: Router) {
    localStorage.removeItem('currentUser');

  }

  ngOnInit() {
  }

  login() {
    this.user.password = btoa(this.user.password);
    console.log(this.user);
    this._userService.logIn(this.user)
      .subscribe(data => {
        var curUser = JSON.parse(localStorage.getItem('currentUser'));
        if (curUser.role == 'student') {
          this._router.navigate(['/student/home']);
        }
        if (curUser.role == 'teacher') {
          this._router.navigate(['/teacher/home']);
        }
        if (curUser.role == 'courseManager') {
          this._router.navigate(['/courseManager/home']);
        }
        if (curUser.role == 'financeManager') {
          this._router.navigate(['/financeManager/home']);
        }
      }, err => {
        this.errorMessage = "error :  Username or password is incorrect";
      }
      )
  }
}
