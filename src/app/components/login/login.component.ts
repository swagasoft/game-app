import { async } from '@angular/core/testing';
import { UserService } from './../../shared/user.service';
import { Component, OnInit  } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
number: any;
password: any;
loading: any;

  constructor(public loadingController: LoadingController,
              private fb: FormBuilder,
              public popoverController: PopoverController,
              private router: Router, private userService: UserService) { 
            
              }

  model = {
    number: '',
    password: ''
  };

  ngOnInit() {}

  async login(form: any) {
    console.log(form);
    console.log(this.model.number);
    console.log(this.model.password);
    // this.presentLoading();
    this.userService.login(this.model).subscribe(response => {
      console.log( 'LOGIN', response);
      console.log('login success');
      this.userService.setToken(response['token']);
      this.router.navigate(['/welcome']);
      // this.loading.onDidDismiss();
    }, error => {
      console.log(error);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'please wait...',
      duration: 2000
    });
    await this.loading.present();

  }

  register() {
    this.router.navigate(['/register']);
  }

  facebook(){
    console.log('facebook login clicked');
  }




  // async presentPopover(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }




}
