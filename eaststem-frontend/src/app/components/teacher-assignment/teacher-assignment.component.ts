import { Component, OnInit } from '@angular/core';
import { Assignment } from 'app/entities/assignment';
import { AssignmentService } from 'app/services/assignment.service';
import { CourseService } from 'app/services/course.service';
import { Router } from '@angular/router';
import { Course } from 'app/entities/course';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-teacher-assignment',
  templateUrl: './teacher-assignment.component.html',
  styleUrls: ['./teacher-assignment.component.css']
})
export class TeacherAssignmentComponent implements OnInit {

  private courses: Course[];
  private assignments: Assignment[];
  private curUser: User;
  private curCourseId: number;
  private curCourseName: string;

  private assignment: Assignment = new Assignment();
  private curAssignment: Assignment = new Assignment();

  constructor(private _assignmentService: AssignmentService, private _courseService: CourseService, private _router: Router) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.courses = new Array();
  }


  assignmentTypeOptions = [
    { value: "essay" },
    { value: "multiple" }
  ]

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

  refresh() {
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
    this._router.navigate(['teacher/assignment/submission'], {
      queryParams: {
        "data": str
      }
    });
  }

  update(assignment: Assignment) {
    this.curAssignment = assignment;
    for (var c of this.courses) {
      if (c.id == this.curAssignment.courseId) {
        this.curCourseName = c.name;
        break;
      }
    }
  }

  getAssignments() {
    this._assignmentService.getAssignments(this.curCourseId).subscribe((response) => {
      this.assignments = response.data;
    }, error => {
      console.log(error);
    })
  }

  createAssignment() {
    this._assignmentService.createOrUpdateAssignment(this.assignment).subscribe((error) => {
      console.log(error);
    })
    document.getElementById('createModal').click();
    this.assignment = new Assignment();
    setTimeout(() => {
      this.refresh()
    },
      200);
  }


  updateAssignment() {
    this._assignmentService.createOrUpdateAssignment(this.curAssignment).subscribe((error) => {
      console.log(error);
    })
    document.getElementById('updateModal').click();
    this.assignment = new Assignment();
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

}
