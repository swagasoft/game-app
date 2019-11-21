import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

 

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public appUser :any;
  public accountBalance:Observable<number>;
  leaderboard$: Observable <any>;


  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
  AuthHeader = {headers: new HttpHeaders().set('Authorization',
  `Bearer ${localStorage.getItem('token')}`)};
  
    constructor(private http: HttpClient, private router: Router) { }

    loadMyBalance() {
      this.appUser = localStorage.getItem('appUser');
      this.http.get(environment.apiBaseUrl + '/get-account-balance').subscribe((value)=> {
        this.accountBalance = value['balance'];
        this.getLeaderboard();
      });
    }

    getLeaderboard() {
    this.http.get(environment.apiBaseUrl + '/get-leaderboard').subscribe((value)=> {
      this.leaderboard$ = value['document'];
      console.log(this.leaderboard$);
    });
    }
   

    loadBalanceForCalculation(){
      return this.http.get(environment.apiBaseUrl + '/get-account-balance');
    }

    deductGameAmountFromAccount(){
      return this.http.get(environment.apiBaseUrl + '/deduct-game-amount');
    }
  
}