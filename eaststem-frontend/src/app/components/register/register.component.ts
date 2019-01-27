import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'app/entities/user';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { cursorTo } from 'readline';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;
  private isStudent: boolean;

  constructor(public _userService: UserService, public _router: Router) {
  }

  ngOnInit() {
    this.isStudent = false;
  }

  options = [
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
    { name: "Course Manager", value: "courseManager" },
    { name: "Finance Manager", value: "financeManager" }
  ]

  countryOptions = [
    { name: "India", value: "india" },
    { name: "Canada", value: "canada" },
    { name: "China", value: "china" },
    { name: "Korea", value: "korea" },
    { name: "United States", value: "unitedStates" },
    { name: "Vietnam", value: "vietnam" }
  ]

  majorOptions = [
    { name: "Computer Science", value: "cs" },
    { name: "Computer Science Align", value: "csa" },
    { name: "Information System", value: "is" },
    { name: "Data Analysis", value: "da" }
  ]

  register() {
    this.user.password = btoa(this.user.password);
    this._userService.createAccount(this.user).subscribe(data => {
      this._router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.errorMessage = "username already exist";
    }
    )
  }

  update() {
    if (this.user.role == 'student') {
      this.isStudent = true;
    } else {
      this.isStudent = false;
    }
  }
}
