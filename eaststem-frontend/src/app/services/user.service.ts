import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {User} from '../entities/user';


/**
 * user related service
 */

@Injectable()
export class UserService {
  // private baseUrl: string = 'http://localhost:8080/api';
  private baseUrl: string = 'http://13.57.36.150:8080/api';
  private user: User;
  private curUser: User = new User();
  private header: Headers;
  private options: RequestOptions;

  constructor(private _http: Http) {
    this.header = new Headers({'Content-Type': 'application/json'});
    var base64Credential: string = '';
    if (localStorage.getItem('currentUser')) {
      var curUser = JSON.parse(localStorage.getItem('currentUser'));
      base64Credential = btoa(curUser.username + ':' + curUser.password);
    }
    this.header.append("Authorization", "Basic " + base64Credential);
    this.options = new RequestOptions();
    this.options.headers = this.header;
  }

  refresh() {
    this.header = new Headers({'Content-Type': 'application/json'});
    var base64Credential: string = '';
    if (localStorage.getItem('currentUser')) {
      var curUser = JSON.parse(localStorage.getItem('currentUser'));
      base64Credential = btoa(curUser.username + ':' + curUser.password);
    }
    this.header.append("Authorization", "Basic " + base64Credential);
    this.options = new RequestOptions();
    this.options.headers = this.header;
  }

  getUsers() {
    this.refresh();
    return this._http.get(this.baseUrl + '/users', this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  getUser(id: number) {
    this.refresh();
    return this._http.get(this.baseUrl + '/user/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  deleteUser(id: number) {
    this.refresh();
    return this._http.delete(this.baseUrl + '/user/' + id, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  createUser(user: User) {
    let header = new Headers({'Content-Type': 'application/json'});
    var curUser: User = JSON.parse(localStorage.getItem('currentUser'));
    let options = new RequestOptions();
    options.headers = header;

    return this._http.post(this.baseUrl + '/user/', JSON.stringify(user), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  updateUser(user: User) {
    this.refresh();
    return this._http.put(this.baseUrl + '/user/', JSON.stringify(user), this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  errorHanlder(error: Response) {
    return Observable.throw(error || 'SERVER ERROR')
  }

  public logIn(user: User) {
    this.header = new Headers({'Content-Type': 'application/json'});
    var base64Credential: string = btoa(user.username + ':' + user.password);
    this.header.append("Authorization", "Basic " + base64Credential);
    this.options = new RequestOptions();
    this.options.headers = this.header;
    return this._http.get(this.baseUrl + "/account/login", this.options)
      .map((response: Response) => {
        let user = response.json().principal;
        if (user) {
          console.log('this is password:::::::' + user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  getTeachers() {
    this.refresh();
    return this._http.get(this.baseUrl + "/users/teacher", this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  logOut() {
    // remove user from local storage to log user out
    return this._http.post(this.baseUrl + "/account/logout", {})
      .map((response: Response) => {
        console.log('remove it ~~~~');
        localStorage.removeItem('currentUser');
      });

  }

  createAccount(user: User) {
    return this._http.post(this.baseUrl + '/account/register', user, this.options)
      .map((response: Response) => response.json())
      .catch(this.errorHanlder);
  }

  setter(user: User) {
    this.user = user;
  }

  getter() {
    return this.user;
  }
}
