import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScholarshipService } from 'app/services/scholarship.service';
import { Scholarship } from 'app/entities/scholarship';

@Component({
  selector: 'app-student-scholarship',
  templateUrl: './student-scholarship.component.html',
  styleUrls: ['./student-scholarship.component.css']
})
export class StudentScholarshipComponent implements OnInit {

  private scholarships: Scholarship[];

  constructor(private _router: Router, private _scholarshipService: ScholarshipService) { }

  ngOnInit() {
    this._scholarshipService.getScholarshipsByStudent().subscribe((response) => {
      this.scholarships = response.data;
    }, (error) => {
      console.log(error);
    })
  }

}
