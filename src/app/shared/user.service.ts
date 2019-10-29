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
    console.log(question);
    return this.http.post(environment.apiBaseUrl + '/post-question', question);
  }

  login(credentials) {
    return this.http.post(environment.apiBaseUrl  + '/login',
     credentials, this.noAuthHeader);
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
     console.log('inside user payload');
     const token = this.getToken();
     if (token) {
       console.log('this is token',token);
       const userPayload = atob(token.split('.')[1]);
       return JSON.parse(userPayload);
     } else {
       return null;
     }
   }
 
   isLogedIn() {
     const userPayload = this.getUserPayload();
     if (userPayload) {
     console.log('USER IS LOGGED IN');
       console.log(userPayload);
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
