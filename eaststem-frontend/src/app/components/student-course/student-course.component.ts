import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/services/course.service';
import { Router } from '@angular/router';
import { Course } from 'app/entities/course';
import { User } from 'app/entities/user';
import { delay } from 'q';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {

  private courses: Course[];
  private curUser: User;
  private curCourse: Course;
  private msg: string;

  constructor(private _courseService: CourseService, private _router: Router) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.curCourse = new Course();
    this.courses = new Array();
  }


  ngOnInit() {
    this._courseService.getCourses().subscribe((response) => {
      console.log(response);
      this.courses = response.data;
      console.log(this.courses);
    }, error => {
      console.log(error);
    }
    )
  }

  refresh() {
    this._courseService.getCourses().subscribe((response) => {
      console.log(response);
      this.courses = response.data;
      console.log(this.courses);
    }, error => {
      console.log(error);
    }
    )
  }

  update(course: Course) {
    this.curCourse = course;
  }

  drop(courseId: number) {
    this._courseService.dropCourse(courseId).subscribe((response => {
      this.msg = response.msg;
    }), error => {
      console.log(error);
    })
    setTimeout(() => {
      this.refresh()
    },
      300);
  }


}
