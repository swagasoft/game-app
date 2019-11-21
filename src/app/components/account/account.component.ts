import { AccountService } from './../../shared/account.service';
import { UserService } from './../../shared/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

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


  constructor(private router: Router, public userService: UserService,
              public accountService: AccountService,
              public toastController: ToastController,
              public menu: MenuController) {
                if(this.userService.networkDisconnet){
                  this.presentFailNetwork();
                }
               }



  ngOnInit() {
    this.getBalance();
    console.log('init accouont fires');
    this.generateRef();
    this.appUsername = localStorage.getItem('appUser');
  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }
 
  openMenu(){
    this.menu.open();
  }

  profileSection(){
    this.router.navigate(['/profile']);
  }
  paymentCancel(){
    this.amountInput = '';
    this.exactAmount = '';
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
 
   this.userService.postTransaction(process).subscribe(
     res => {
      this.amountInput = '';
      this.exactAmount = '';
      console.log( 'SUCCESS');
      //  console.log(res, 'LOAD SUPPOSE');
      this.accountService.loadMyBalance();
       
      this.generateRef();
     },
     err => {
      this.amountInput = '';
      this.exactAmount = '';
      this.generateRef();
      this.amountInput = null;
      this.accountService.loadMyBalance();
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
  this.accountService.loadMyBalance();
  }
}
