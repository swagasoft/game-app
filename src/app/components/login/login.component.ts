import { async } from '@angular/core/testing';
import { UserService } from './../../shared/user.service';
import { Component, OnInit  } from '@angular/core';
import { LoadingController, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
number: any;
password: any;
loading: boolean;

  constructor(public loadingController: LoadingController,
              private fb: FormBuilder,
              public alertController: AlertController,
              public toastController: ToastController,
              private router: Router, private userService: UserService) { 
                if(userService.networkDisconnet){
                  this.presentFailNetwork();
              }
              }

  model = {
    number: '',
    password: ''
  };

  ngOnInit() {
    this.loading = false;
  }
  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
      duration: 2000
    });
    toast.present();
  }

  async login(form: any) {
    this.loading = true;
    this.userService.login(this.model).subscribe(response => {
      this.userService.setToken(response['token']);
      this.userService.loadBalance();
      localStorage.setItem('appUser',response['doc']['username']);
      this.loading = false;
      this.router.navigate(['/game']);
   
        
    }, error => {
      this.loading = false;
      let message = error.error;
      this.presentAlertConfirm(message);
    });
  }

 

  register() {
    this.router.navigate(['/register']);
  }

  facebook(){
    console.log('facebook login clicked');
  }

  

  
  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      header: 'Ooops!',
      message: ` <strong class="text-danger"> ${msg}</strong>`,
      buttons: [ {
          text: 'Try again',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();

  }



}
