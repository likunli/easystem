import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/entities/user';
import { Course } from 'app/entities/course';

/**
 * course related service
 */

@Injectable()
export class CourseService {
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

  getCourses() {
    this.refresh();
    return this._http.get(this.baseUrl + '/courses?id=' + this.curUser.id + '&role=' + this.curUser.role, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }


  searchCourses(semester: string, major: string) {
    this.refresh();
    return this._http.get(this.baseUrl + '/courses/search?semester=' + semester + '&major=' + major +'&userId=' + this.curUser.id
    + '&role='+ this.curUser.role, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getCourse(id: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/course/?courseId=' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  dropCourse(courseId: number) {
    this.refresh();
    var studentId = this.curUser.id;
    return this._http.get(this.baseUrl + '/course/drop?studentId=' + studentId + '&courseId=' + courseId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  registerCourse(courseId: number) {
    this.refresh();
    var studentId = this.curUser.id;
    return this._http.get(this.baseUrl + '/course/register?studentId=' + studentId + '&courseId=' + courseId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getCourseGrades(semester: string) {
    this.refresh();
    return this._http.get(this.baseUrl + '/course/grade?semester=' + semester + '&userId=' + this.curUser.id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  createCourse(course: Course) {
    this.refresh();
    return this._http.post(this.baseUrl + '/course/create' , course, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  deleteCourse(courseId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/course/detele?id=' + courseId, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  updateCourse(course: Course) {
    this.refresh();
    return this._http.post(this.baseUrl + '/course/update' , course, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }


  grade(courseId: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/course/teacher/grade?id=' + courseId + '&teacherId=' + this.curUser.id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }
}
