import { Component, OnInit } from '@angular/core';
import { AssignmentSubmission } from 'app/entities/assignmentSubmission';
import { Assignment } from 'app/entities/assignment';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'app/services/assignment.service';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-teacher-assignment-submission',
  templateUrl: './teacher-assignment-submission.component.html',
  styleUrls: ['./teacher-assignment-submission.component.css']
})
export class TeacherAssignmentSubmissionComponent implements OnInit {

  private assignmentSubmission: AssignmentSubmission = new AssignmentSubmission();
  private assignmentSubmissions: AssignmentSubmission[];
  private hasSubmission: boolean;
  private curAssignmentSubmission: AssignmentSubmission = new AssignmentSubmission();
  private assignment: Assignment = new Assignment();
  private curGradeStatus: string;
  private max: number;
  constructor(private _router: Router, private _assignmentService: AssignmentService, private _activatedRoute: ActivatedRoute) {
    var str;
    this.curGradeStatus = "all";
    this._activatedRoute.queryParams.subscribe(queryParams => {
      str = queryParams["data"] as string;
    });

    this.assignment = JSON.parse(str);
    this.max = this.assignment.point;
    console.log(this.assignment.point);

    

    this._assignmentService.getAssignmentSubmissionsWithOption(this.assignment.id, this.curGradeStatus)
    .subscribe((response) => {
      this.assignmentSubmissions = response.data;
    })
  }

  refresh() {
    this._assignmentService.getAssignmentSubmissionsWithOption(this.assignment.id, this.curGradeStatus)
    .subscribe((response) => {
      this.assignmentSubmissions = response.data;
    })
  }

  ngOnInit() {

  }

  gradeStatusOptions = [
    { name: "All submission", value: "all" },
    { name: "Graded", value: "graded" },
    { name: "Ungraded", value: "ungraded" }
  ]

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

  update(assignmentSubmission: AssignmentSubmission) {
    this.curAssignmentSubmission = assignmentSubmission;
  }

  gradeSubmission() {
    this.curAssignmentSubmission.isgrade = true;
    this._assignmentService.updateAssignmentSubmission(this.curAssignmentSubmission).subscribe((error) => {
      console.log(error);
    })
    document.getElementById('viewModal').click();
    this.assignmentSubmission = new AssignmentSubmission();
    setTimeout(() => {
      this.refresh()
    },
      200);

  }


}
