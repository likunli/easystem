import { Component, OnInit } from '@angular/core';
import { Assignment } from 'app/entities/assignment';
import { User } from 'app/entities/user';
import { AssignmentService } from 'app/services/assignment.service';
import { Router } from '@angular/router';
import { CourseService } from 'app/services/course.service';
import { Course } from 'app/entities/course';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {

  private courses: Course[];
  private assignments: Assignment[];
  private curUser: User;
  private curCourseId: number;

  constructor(private _assignmentService: AssignmentService, private _courseService: CourseService, private _router: Router) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.courses = new Array();
  }


  ngOnInit() {
    this.curCourseId = -1;
    this._assignmentService.getAssignments(this.curCourseId).subscribe((response) => {
      this.assignments = response.data;
    }, error => {
      console.log(error);
    })

    this._courseService.getCourses().subscribe((response) => {
      this.courses = response.data;
    }, error => {
      console.log(error);
    })

  }

  viewDetail(assignment: Assignment) {
    var str = JSON.stringify(assignment);
    this._router.navigate(['student/assignment/submission'], {
      queryParams: {
        "data": str
      }
    });
  }

  getAssignments() {
    this._assignmentService.getAssignments(this.curCourseId).subscribe((response) => {
      this.assignments = response.data;
    }, error => {
      console.log(error);
    })
  }



}
