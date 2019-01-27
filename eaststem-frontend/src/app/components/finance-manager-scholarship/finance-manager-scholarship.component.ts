import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScholarshipService } from 'app/services/scholarship.service';
import { Scholarship } from 'app/entities/scholarship';
import { ComponentStillLoadingError } from '@angular/core/src/linker/compiler';
import { User } from 'app/entities/user';

@Component({
  selector: 'app-finance-manager-scholarship',
  templateUrl: './finance-manager-scholarship.component.html',
  styleUrls: ['./finance-manager-scholarship.component.css']
})
export class FinanceManagerScholarshipComponent implements OnInit {


  private curSearch: string;
  private scholarship: Scholarship = new Scholarship();
  private curScholarship: Scholarship = new Scholarship();
  private scholarships: Scholarship[];
  private curTypeMajor: boolean;
  private curTypeCountry: boolean;
  private curTypeGpa: boolean;
  private curUser: User;
  constructor(private _router: Router, private _scholarshipService: ScholarshipService) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.curSearch = '';
    this.curTypeCountry = false;
    this.curTypeGpa = false;
    this.curTypeMajor = false;
    this._scholarshipService.getScholarshipsByManager().subscribe((response) => {
      this.scholarships = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  ngOnInit() {
  }

  refresh() {
    this.curSearch = '';
    this.curTypeCountry = false;
    this.curTypeGpa = false;
    this.curTypeMajor = false;
    this._scholarshipService.getScholarshipsByManager().subscribe((response) => {
      this.scholarships = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  scholarshipTypeOptions = [
    { value: "Merit_Based_Gpa" },
    { value: "Status_Based_Country" },
    { value: "Status_Based_Major" }
  ]

  deductionTypeOptions = [
    { value: "amount" },
    { value: "rate" }
  ]

  countryOptions = [
    { name: "India", value: "india" },
    { name: "Canada", value: "canada" },
    { name: "China", value: "china" },
    { name: "Korea", value: "korea" },
    { name: "United States", value: "unitedStates" },
    { name: "Vietnam", value: "vietnam" }
  ]

  majorOptions = [
    { name: "Computer Science", value: "cs" },
    { name: "Computer Science Align", value: "csa" },
    { name: "Information System", value: "is" },
    { name: "Data Analysis", value: "da" }
  ]

  searchScholarship() {
    this._scholarshipService.searchScholarship(this.curSearch).subscribe((response) => {
      this.scholarships = response.data;
    }, (error) => {
      console.log(error);
    })
  }

  createScholarship() {
    this.scholarship.financeManagerId = this.curUser.id;
    this._scholarshipService.createScholarship(this.scholarship).subscribe((error) => {
      console.log(error);
    })
    this.scholarship = new Scholarship();
    document.getElementById('createModal').click();
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  updateScholarship() {
    this._scholarshipService.createScholarship(this.curScholarship).subscribe((error) => {
      console.log(error);
    })
    document.getElementById('updateModal').click();
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  updateCurType() {
    switch (this.scholarship.scholarshipType) {
      case "Merit_Based_Gpa":
        this.curTypeCountry = false;
        this.curTypeGpa = true;
        this.curTypeMajor = false;
        break;
      case "Status_Based_Country":
        this.curTypeCountry = true;
        this.curTypeGpa = false;
        this.curTypeMajor = false;
        break;
      case "Status_Based_Major":
        this.curTypeCountry = false;
        this.curTypeGpa = false;
        this.curTypeMajor = true;
        break;
      default:
        this.curTypeCountry = false;
        this.curTypeGpa = false;
        this.curTypeMajor = false;
        break;
    }
  }

  updateCurTypeAtUpdate() {
    console.log(this.curScholarship.scholarshipType);
    switch (this.curScholarship.scholarshipType) {
      case "Merit_Based_Gpa":
        this.curTypeCountry = false;
        this.curTypeGpa = true;
        this.curTypeMajor = false;
        break;
      case "Status_Based_Country":
        this.curTypeCountry = true;
        this.curTypeGpa = false;
        this.curTypeMajor = false;
        break;
      case "Status_Based_Major":
        this.curTypeCountry = false;
        this.curTypeGpa = false;
        this.curTypeMajor = true;
        break;
      default:
        this.curTypeCountry = false;
        this.curTypeGpa = false;
        this.curTypeMajor = false;
        break;
    }
  }

  update(scholarship: Scholarship) {
    this.curScholarship = scholarship;
  }

  delete(scholarshipId: number) {
    this._scholarshipService.deleteScholarship(scholarshipId).subscribe((error) => {
      console.log(error);
    })
    setTimeout(() => {
      this.refresh()
    },
      200);
  }

  attach(scholarshipId: number) {
    this._scholarshipService.attachScholarship(scholarshipId).subscribe((error) => {
      console.log(error);
    })
    setTimeout(() => {
      this.refresh()
    },
      200);
  }



}
