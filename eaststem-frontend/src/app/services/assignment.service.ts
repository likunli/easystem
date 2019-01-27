import { Injectable } from '@angular/core';
import { User } from 'app/entities/user';
import { RequestOptions, Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AssignmentSubmission } from 'app/entities/assignmentSubmission';
import { Assignment } from 'app/entities/assignment';

/**
 * assignment related service
 */

@Injectable()
export class AssignmentService {

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

  getAssignments(courseId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/assignments?userId=' + this.curUser.id + '&role=' + this.curUser.role + '&courseId=' + courseId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getAssignment(assignmentId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/assignment?id=' + assignmentId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getAssignmentSubmissions(assignmentId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/assignment/submissions?assignmentId=' + assignmentId + '&userId=' + this.curUser.id + '&role=' + this.curUser.role, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  deleteSubmission(assignmentSubmissionId: number) {
    this.refresh;
    return this._http.get(this.baseUrl + '/assignment/submission/delete?id=' + assignmentSubmissionId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  updateSubmission(submissionId: number, submissionContent: string, submissionComment: string) {
    this.refresh();
    return this._http.get(this.baseUrl + '/assignment/submission/update?id=' + submissionId + '&content=' + submissionContent + '&comment=' + submissionComment, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  createSubmission(assignmentSubmission: AssignmentSubmission) {
    this.refresh();
    return this._http.post(this.baseUrl + '/assignment/submission/create' ,assignmentSubmission, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  updateAssignmentSubmission(assignmentSubmission: AssignmentSubmission) {
    this.refresh();
    return this._http.post(this.baseUrl + '/assignment/submission/update' ,assignmentSubmission, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }


  getAssignmentSubmissionsWithOption(assignmentId: number, option: string) {
    this.refresh();
    return this._http.get(this.baseUrl + '/assignment/teacher/submissions?assignmentId=' + assignmentId + '&userId=' + this.curUser.id + '&role=' + this.curUser.role + '&option=' + option, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  createOrUpdateAssignment(assignment: Assignment) {
    this.refresh();
    return this._http.post(this.baseUrl + '/assignment/createOrUpdate' ,assignment, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }
}
