import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-nav',
  templateUrl: './teacher-nav.component.html',
  styleUrls: ['./teacher-nav.component.css']
})
export class TeacherNavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
