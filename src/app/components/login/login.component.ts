import { async } from '@angular/core/testing';
import { UserService } from './../../shared/user.service';
import { Component, OnInit  } from '@angular/core';
import { LoadingController, PopoverController, AlertController } from '@ionic/angular';
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
loading: any;

  constructor(public loadingController: LoadingController,
              private fb: FormBuilder,
              public alertController: AlertController,
              private router: Router, private userService: UserService) { 
            
              }

  model = {
    number: '',
    password: ''
  };

  ngOnInit() {
  }

  async login(form: any) {
    this.userService.login(this.model).subscribe(response => {
      this.userService.setToken(response['token']);
      this.userService.loadBalance();
      localStorage.setItem('appUsername',response['doc']['username']);
      
      this.router.navigate(['/game']);
   
        
    }, error => {
      console.log(error);
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


  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      // duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
        loading.present();

  }


}
