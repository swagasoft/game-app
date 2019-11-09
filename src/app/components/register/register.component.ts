import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              public alertController: AlertController,
               private router: Router) { }
  model = {
    number: '',
    password: '',
    username: '',
    conf_password:''
  };

  register(){
    this.userService.registerUser( this.model).subscribe( 
      response => {
    this.presentSuccess();        
        
      },
      error => {
        console.log(error);
        this.presentAlertConfirm(error.error);
      }
    );
  }


  ngOnInit() {}

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
