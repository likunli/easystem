import { Component, OnInit } from '@angular/core';
import { Course } from 'app/entities/course';
import { CourseService } from 'app/services/course.service';
import { Router } from '@angular/router';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {

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

  evaluationOptions = [
    { value: "pointBased" },
    { value: "rankBased" }
  ]

  update(course: Course) {
    this.curCourse = course;
  }

  setCourseEveluationType() {
    this._courseService.updateCourse(this.curCourse).subscribe((error) => {
      console.log(error);
    });
    document.getElementById('createModal').click();

    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  grade() {
    this._courseService.grade(this.curCourse.id).subscribe((error) => {
      console.log(error);
    });

    setTimeout(() => {
      this.refresh()
    },
      200);
  }

}
