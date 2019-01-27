import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Course } from 'app/entities/course';
import { User } from 'app/entities/user';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-course-manager-manage-course',
  templateUrl: './course-manager-manage-course.component.html',
  styleUrls: ['./course-manager-manage-course.component.css']
})
export class CourseManagerManageCourseComponent implements OnInit {

  private curUser: User = new User();
  private teachers: User[] = new Array();

  private curCourse: Course = new Course();
  private courses: Course[] = new Array();
  course: Course;
  private curTeacherName: string;
  private semester: string;
  private major: string;

  constructor(private _router: Router, private _courseService: CourseService, private _userService: UserService) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.semester = '*';
    this.major = '*';
    this.course = new Course();
    this.curCourse = new Course();
    this.curTeacherName = '';
    this._userService.getTeachers().subscribe((response) => {
      this.teachers = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  semesterOptions = [
    { name: "All Semesters", value: "*" },
    { name: "2018 Spring", value: "2018Spring" },
    { name: "2018 Fall", value: "2018Fall" },
    { name: "2019 Spring", value: "2019Spring" },
    { name: "2019 Fall", value: "2019Fall" }
  ]

  majorOptions = [
    { name: "All Majors", value: "*" },
    { name: "Information System", value: "is" },
    { name: "Computer Science", value: "cs" },
    { name: "Computer Science Align", value: "csalign" },
    { name: "Data Science", value: "ds" }
  ]

  CsemesterOptions = [
    { name: "2018 Spring", value: "2018Spring" },
    { name: "2018 Fall", value: "2018Fall" },
    { name: "2019 Spring", value: "2019Spring" },
    { name: "2019 Fall", value: "2019Fall" }
  ]

  CmajorOptions = [
    { name: "Information System", value: "is" },
    { name: "Computer Science", value: "cs" },
    { name: "Computer Science Align", value: "csalign" },
    { name: "Data Science", value: "ds" }
  ]

  courseTypeOptions = [
    { value: "Online" },
    { value: "Offline" }
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
    for(let i of this.teachers) {
      if(i.id == this.curCourse.teacherId) {
        this.curTeacherName = i.username
      }
    }
    
  }

  delete(courseId: number) {
    this._courseService.deleteCourse(courseId).subscribe(error => {
      console.log(error);
    });
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  createCourse() {
    document.getElementById('createModal').click();
    this.course.courseManagerId = this.curUser.id;
    this._courseService.createCourse(this.course).subscribe((response) => { }
      , (error) => {
        console.log(error);
      })
    this.course = new Course();
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  updateCourse() {
    document.getElementById('updateModal').click();
    this.curCourse.courseManagerId = this.curUser.id;
    this._courseService.updateCourse(this.curCourse).subscribe((response) => { }
      , (error) => {
        console.log(error);
      })
    this.course = new Course();
    setTimeout(() => {
      this.refresh()
    },
      200);

  }

}
