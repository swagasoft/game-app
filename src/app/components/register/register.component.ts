import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: boolean;
  phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


  constructor(private userService: UserService,
              public alertController: AlertController,
              public toastController: ToastController,
              private router: Router) {
                if(this.userService.networkDisconnet){
                  this.presentFailNetwork();
              }
               }
  model = {
    number: '',
    password: '',
    username: '',
    conf_password:''
  };

  register(){
    this.loading = true;
    this.userService.registerUser( this.model).subscribe( 
      response => {
        this.loading = false;
        this.presentSuccess();        
        
      },
      error => {
        this.loading = false;
        console.log(error);
        this.presentAlertConfirm(error.error);
      }
    );
  }


  ngOnInit() {
    this.loading = false;
  }

  async presentAlertConfirm(msg) {
    const alert = await this.alertController.create({
      header: 'Oooopps!',
      message: ` <strong class="text-danger"> ${msg}</strong>`,
      buttons: [ {
          text: 'Try again',
          handler: () => {
            console.log('Confirm retry');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
      duration: 2000
    });
    toast.present();
  }

  async presentSuccess() {
    const alert = await this.alertController.create({
      header: 'SUCCESS!',
      message: ` <strong class="text-center font-weight-bold">  </strong>`,
      buttons: [ {
          text: 'continue to login',
          handler: () => {
           this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
