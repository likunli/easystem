import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from 'app/entities/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  private curUser: User;
  private isLogin: boolean = false;
  private isStudent: boolean;
  private isTeacher: boolean;
  private isCourseManager: boolean;
  private isFinanceManager: boolean;
  constructor(private _userService: UserService, private _route: Router) {
    if (localStorage.getItem('currentUser')) {
      this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.isLogin = this.curUser == null ? false : true;


  }

  ngOnInit() {
  }

  logOut() {
    this._userService.logOut()
      .subscribe(
        data => {
          this._route.navigate(['/cover']);
        },
        error => {
        });
  }

  // about() {
  //   this._route.navigate(['/about']);
  // }

  // contact() {
  //   this._route.navigate(['/contact']);
  // }

  navigate() {
    if (localStorage.getItem('currentUser')) {
      switch (this.curUser.role) {
        case "student":
          this._route.navigate(['/student/home']);
          break;
        case "teacher":
          this._route.navigate(['/teacher/home']);
          break;
        case "courseManager":
          this._route.navigate(['/courseManager/home']);
          break;
        case "financeManager":
          this._route.navigate(['/financeManager/home']);
          break;
        default:
      }
    } else {
      this._route.navigate(['/cover']);
    }



  }
}
