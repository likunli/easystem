import { Component, OnInit } from '@angular/core';
import { AssignmentSubmission } from 'app/entities/assignmentSubmission';
import { Assignment } from 'app/entities/assignment';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'app/services/assignment.service';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-student-assignment-submission',
  templateUrl: './student-assignment-submission.component.html',
  styleUrls: ['./student-assignment-submission.component.css']
})
export class StudentAssignmentSubmissionComponent implements OnInit {

  private assignmentSubmission: AssignmentSubmission = new AssignmentSubmission();
  private assignmentSubmissions: AssignmentSubmission[];
  private hasSubmission: boolean;
  private assignment: Assignment = new Assignment();
  constructor(private _router: Router, private _assignmentService: AssignmentService, private _activatedRoute: ActivatedRoute) {
    var str;
    this._activatedRoute.queryParams.subscribe(queryParams => {
      str = queryParams["data"] as string;
    });

    this.assignment = JSON.parse(str);

    this._assignmentService.getAssignmentSubmissions(this.assignment.id)
      .subscribe((response) => {
        this.assignmentSubmissions = response.data;
        if (this.assignmentSubmissions.length != 1) {
          this.hasSubmission = false;
        } else {
          this.hasSubmission = true;
          this.assignmentSubmission = this.assignmentSubmissions[0];
        }
      })
  }

  refresh() {
    this._assignmentService.getAssignmentSubmissions(this.assignment.id)
      .subscribe((response) => {
        this.assignmentSubmissions = response.data;
        if (this.assignmentSubmissions.length != 1) {
          this.hasSubmission = false;
        } else {
          this.hasSubmission = true;
          this.assignmentSubmission = this.assignmentSubmissions[0];
        }
      })
  }

  ngOnInit() {

  }

  deleteSubmission() {
    this._assignmentService.deleteSubmission(this.assignmentSubmission.id).subscribe((error) => {
      console.log(error);
    })
    this.assignmentSubmission = new AssignmentSubmission();
    setTimeout(() => {
      this.refresh()
    },
      200);

  }

  updateSubmission() {
    this._assignmentService.updateSubmission(this.assignmentSubmission.id, this.assignmentSubmission.content, this.assignmentSubmission.comment)
      .subscribe((error) => {
        console.log(error);
      })
  }

  submitSubmission() {
    var curUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this.assignmentSubmission.studentId = curUser.id;
    this.assignmentSubmission.assignmentId = this.assignment.id;
    this.assignmentSubmission.courseId = this.assignment.courseId;
    this.assignmentSubmission.studentName = curUser.username;
    this._assignmentService.createSubmission(this.assignmentSubmission)
      .subscribe((response) => {
        this.assignmentSubmission = response.data;
      }
        , (error) => {
          console.log(error);
        })

    setTimeout(() => {
      this.refresh()
    },
      200);
  }

}
