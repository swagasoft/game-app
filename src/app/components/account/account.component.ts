import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  reference: any;
  title: any;
  appUsername: any;
  amountInput: any;
  exactAmount: any;
  balance: any;

  constructor(private router: Router, public userService: UserService) { }



  ngOnInit() {
    this.getBalance();
    this.generateRef();
    this.appUsername = localStorage.getItem('appUsername');

  }

  profileSection(){
    this.router.navigate(['/profile']);
  }
  paymentCancel(){
    this.generateRef();
    // this.amountInput = null;
  }
  generateRef() {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  paymentDone(process: any) {
   process.username = this.appUsername;
   process.amount = this.exactAmount;
   console.log(this.appUsername);
   this.generateRef();
   this.userService.postTransaction(process).subscribe(
     res => {
       this.getBalance();
   this.amountInput = null;
     },
     err => {
   this.amountInput = null;
   console.log(err);
     }
   );
  
   console.log( process);
  }

  payNow(){
    console.log('pay now is clicked..');
    this.exactAmount = this.amountInput;
    const paymentAmount = this.amountInput + '00';
    this.amountInput = paymentAmount;
    console.log(this.exactAmount);
    console.log(this.amountInput);
  }

  getBalance(){
    this.userService.loadBalance().subscribe(
      res => { this.balance = res['balance']}
    );
  }
}
