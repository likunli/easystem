import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ScholarshipService } from 'app/services/scholarship.service';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-finance-manager-course-rate',
  templateUrl: './finance-manager-course-rate.component.html',
  styleUrls: ['./finance-manager-course-rate.component.css']
})

export class FinanceManagerCourseRateComponent implements OnInit {

  private curUser: User;
  private courseRate: number;
  private curRate: number;
  constructor(private _router: Router, private _scholarshipService: ScholarshipService) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this._scholarshipService.getCourseRate().subscribe((response) => {
      
      this.courseRate = response.data as number;
      console.log(this.courseRate);
    }, (error) => {
      console.log(error);
    })
  }

  refresh() {
    this._scholarshipService.getCourseRate().subscribe((response) => {
      this.courseRate = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

  setCourseRate() {
    
    document.getElementById('createModal').click();
    this._scholarshipService.setCourseRate(this.curRate).subscribe((error) => {
      console.log(error);
    })

    setTimeout(() => {
      this.refresh()
    },
      300);
  }
}
