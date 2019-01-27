import { Injectable } from '@angular/core';
import { User } from 'app/entities/user';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Scholarship } from 'app/entities/scholarship';

/**
 * scholarship related service
 */

@Injectable()
export class ScholarshipService {

  // private baseUrl: string = 'http://localhost:8080/api';
  private baseUrl: string = 'http://13.57.36.150:8080/api';
  private curUser: User;
  private header: Headers;
  private options: RequestOptions;
  constructor(private _http: Http) {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.header = new Headers({ 'Content-Type': 'application/json' });
    var base64Credential: string = btoa(this.curUser.username + ':' + this.curUser.password);
    this.header.append("Authorization", "Basic " + base64Credential);
    this.options = new RequestOptions();
    this.options.headers = this.header;
  }

  errorHanlder(error: Response) {
    return Observable.throw(error || 'SERVER ERROR')
  }

  refresh() {
    this.curUser = JSON.parse(localStorage.getItem('currentUser'));
    this.header = new Headers({ 'Content-Type': 'application/json' });
    var base64Credential: string = btoa(this.curUser.username + ':' + this.curUser.password);
    this.header.append("Authorization", "Basic " + base64Credential);
    this.options = new RequestOptions();
    this.options.headers = this.header;
  }

  getScholarshipsByStudent() {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarships/student?userId=' + this.curUser.id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getScholarshipsByManager() {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarships/manager?userId=' + this.curUser.id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  searchScholarship(exp: string) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarships/search?exp=' + exp
      + '&userId=' + this.curUser.id + '&role=' + this.curUser.role, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  createScholarship(scholarship: Scholarship) {
    this.refresh();
    return this._http.post(this.baseUrl + '/scholarship/create' , scholarship , this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  deleteScholarship(scholarshipId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarship/delete?id=' + scholarshipId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  attachScholarship(scholarshipId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarship/attach?id=' + scholarshipId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getScholarshipAssignments(financeManagerId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarship/assignments?managerId=' + financeManagerId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  deleteScholarshipAssignment(scholarshipAssignmentId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarship/assignment/delete?id=' + scholarshipAssignmentId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  searchScholarshipAssignment(exp: string, userId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/scholarship/assignment/search?exp=' + exp + '&userId=' + userId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getCourseRate() {
    this.refresh();
    return this._http.get(this.baseUrl + '/course/credit', this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);

  }

  setCourseRate(credit: number) {
    return this._http.get(this.baseUrl + '/course/credit/set?credit=' + credit, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }
}
