import { Component, OnInit } from '@angular/core';
import { User } from 'app/entities/user';
import { Route, Router } from '@angular/router';
import { ScholarshipAssignment } from 'app/entities/scholarshipAssignment';
import { ScholarshipService } from 'app/services/scholarship.service';
import { ShownScholarship } from 'app/entities/shownScholarship';

@Component({
  selector: 'app-finance-manager-scholarship-attachment',
  templateUrl: './finance-manager-scholarship-attachment.component.html',
  styleUrls: ['./finance-manager-scholarship-attachment.component.css']
})
export class FinanceManagerScholarshipAttachmentComponent implements OnInit {


  private curUser: User;
  private scholarshipList: ShownScholarship[];
  private curShownScholarship = new ShownScholarship();
  private curSearch = '';
  constructor(private _router: Router, private _scholarshipAssignment: ScholarshipService) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));

    this._scholarshipAssignment.getScholarshipAssignments(this.curUser.id).subscribe((response) => {
      this.scholarshipList = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

  refresh() {
    this._scholarshipAssignment.getScholarshipAssignments(this.curUser.id).subscribe((response) => {
      this.scholarshipList = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  update(shownScholarship: ShownScholarship) {
    this.curShownScholarship = shownScholarship;
  }


  delete(scholarAssignmentId: number) {
    this._scholarshipAssignment.deleteScholarshipAssignment(scholarAssignmentId).subscribe((error) => {
      console.log(error);
    })
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  searchScholarshipAssignment() {
    this._scholarshipAssignment.searchScholarshipAssignment(this.curSearch, this.curUser.id).subscribe((response) => {
      this.scholarshipList = response.data;
    },(error) => {
      console.log(error);
    })
  }

}
