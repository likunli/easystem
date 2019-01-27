import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-manager-nav',
  templateUrl: './course-manager-nav.component.html',
  styleUrls: ['./course-manager-nav.component.css']
})
export class CourseManagerNavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
