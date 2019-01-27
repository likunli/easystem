import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/user';
import { CourseService } from 'app/services/course.service';
import { Router } from '@angular/router';
import { CourseGrade } from 'app/entities/courseGrade';

@Component({
  selector: 'app-student-grade',
  templateUrl: './student-grade.component.html',
  styleUrls: ['./student-grade.component.css']
})
export class StudentGradeComponent implements OnInit {
  private curUser: User;
  private semester: string;
  private courseGrade: CourseGrade[];

  constructor(private _courseService: CourseService, private _router: Router) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.semester = '*';
    this._courseService.getCourseGrades(this.semester).subscribe((response) => {
      this.courseGrade = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

  semesterOptions = [
    { name: "All Semesters", value: "*" },
    { name: "2018 Spring", value: "2018Spring" },
    { name: "2018 Fall", value: "2018Fall" },
    { name: "2019 Spring", value: "2019Spring" },
    { name: "2019 Fall", value: "2019Fall" }
  ]

  refresh() {
    this._courseService.getCourseGrades(this.semester).subscribe((response) => {
      this.courseGrade = response.data;
    }, (error) => {
      console.log(error);
    })

  }

}

