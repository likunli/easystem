import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { User } from 'app/entities/user';
import { Course } from 'app/entities/course';
import { delay } from 'q';

@Component({
  selector: 'app-student-register-course',
  templateUrl: './student-register-course.component.html',
  styleUrls: ['./student-register-course.component.css']
})
export class StudentRegisterCourseComponent implements OnInit {

  private courses: Course[];
  private curUser: User;
  private semester: string;
  private major: string;
  private curCourse ?: Course;

  constructor(private _router: Router, private _courseService: CourseService) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.semester = '*';
    this.major = '*';
    this.curCourse = new Course();
  }

  semesterOptions = [
    {name: "All Semesters", value: "*"},
    {name: "2018 Spring", value: "2018Spring"},
    {name: "2018 Fall", value: "2018Fall"},
    {name: "2019 Spring", value: "2019Spring"},
    {name: "2019 Fall", value: "2019Fall"}
  ]

  majorOptions = [
    {name: "All Majors", value: "*"},
    {name: "Information System", value: "is"},
    {name: "Computer Science", value: "cs"},
    {name: "Computer Science Align", value: "csalign"},
    {name: "Data Science", value: "ds"}
  ]

  ngOnInit() {
    this._courseService.searchCourses(this.semester, this.major).subscribe((response) => {
      this.courses = response.data;
    }, error => {
      console.log(error);
    }
    )
  }

  refresh() {
    this._courseService.searchCourses(this.semester, this.major).subscribe((response) => {
      this.courses = response.data;
    }, error => {
      console.log(error);
    }
    )
  }

  update(course: Course) {
    this.curCourse = course;
  }

  register(courseId: number) {
    this._courseService.registerCourse(courseId).subscribe( error=> {
      console.log(error);
    });
    setTimeout(() => {
      this.refresh()
    },
      300);
  }

}
