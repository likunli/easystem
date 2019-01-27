import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/entities/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  private isStudent: boolean;
  private isTeacher: boolean;
  private isCourseManager: boolean;
  private isFinanceManager: boolean;
  private curUser: User = new User();
  constructor(private _router: Router, private _userService: UserService) {
    var userId: number;
    this.isStudent = false;
    this.isTeacher = false;
    this.isCourseManager = false;
    this.isFinanceManager = false;
    if (localStorage.getItem('currentUser')) {
      userId = JSON.parse(localStorage.getItem('currentUser')).id;
      var role = JSON.parse(localStorage.getItem('currentUser')).role;
      switch (role) {
        case "student":
          this.isStudent = true;
          break;
        case "teacher":
          this.isTeacher = true;
          break;
        case "courseManager":
          this.isCourseManager = true;
          break;
        case "financeManager":
          this.isFinanceManager = true;
          break;
        default: break;
      }
    }
    _userService.getUser(userId).subscribe((response) => {
      this.curUser = response.data;
    }, (error) => {
      console.log(error);
    })


  }

  ngOnInit() {
  }

}
