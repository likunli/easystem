import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-manager-nav',
  templateUrl: './finance-manager-nav.component.html',
  styleUrls: ['./finance-manager-nav.component.css']
})
export class FinanceManagerNavComponent implements OnInit {

  constructor(private _router: Router) {

  }

  ngOnInit() {
  }

}
