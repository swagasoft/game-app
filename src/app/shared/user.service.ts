import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
token: any;


noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};

  constructor(private http: HttpClient, private router: Router) { }


  registerUser( user) {
    return this.http.post(environment.apiBaseUrl + '/register' , user, this.noAuthHeader);
  }

  postQuestion(question){
    return this.http.post(environment.apiBaseUrl + '/post-question', question);
  }

  getAllQuestions(){
    return this.http.get(environment.apiBaseUrl + '/get-all-questions');
  }

  login(credentials) {
    return this.http.post(environment.apiBaseUrl  + '/login',
     credentials, this.noAuthHeader);
  }

  // Random tips on Random
  getRandomTips(){
    return this.http.get(environment.apiBaseUrl + '/get-random-tip');
  }

  findByCategory(category){
    return this.http.get(environment.apiBaseUrl + `/find-by-category${category}`, );
  }

  changeQuestionStatusToFalse(id){
    return this.http.get(environment.apiBaseUrl + `/change-to-false${id}`);
  }
  changeQuestionStatusToTrue(id){
    return this.http.get(environment.apiBaseUrl + `/change-to-true${id}`);
  }

  getSingleQuestion(id){
    return this.http.get(environment.apiBaseUrl + `/get-single-question${id}`);
  }

  getUserRole(){
    return localStorage.getItem('user-role');
   }
 
   setToken(token: string) {
    localStorage.setItem('token', token);
 
   }
   deleteToken() {
     window.localStorage.removeItem('token');
   }
 
   public getToken(): string {
   this.token = localStorage.getItem('token');
   return this.token;
   }

 
   getUserPayload() {
     const token = this.getToken();
     if (token) {
       const userPayload = atob(token.split('.')[1]);
       return JSON.parse(userPayload);
     } else {
       return null;
     }
   }
 
   isLogedIn() {
     const userPayload = this.getUserPayload();
     if (userPayload) {
     return userPayload.exp > Date.now() / 1000;
     } else {
     return false;
     }
   }
   public logout(): void {
    this.deleteToken();
    this.token = '';
    this.router.navigateByUrl('/login');
   }
 
}
