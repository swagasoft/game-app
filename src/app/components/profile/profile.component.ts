import { AccountService } from './../../shared/account.service';
import { UserService } from './../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
loading = false;
emailRegex = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
  constructor(private userService: UserService,
              public menu: MenuController,
              public toastController: ToastController,
              public accountService: AccountService) {
                if(this.userService.networkDisconnet){
                  this.presentFailNetwork();
                }
               }


  model = {
    fullname :'',
    nationality: '',
    accountNumber: '', 
    accountName: '',
    bank : '',
    email : ''
  }


  setNationality = {
    selectedOption : [
    ]
  }


  ngOnInit() {
    this.loading = false;
  }
  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }


  createProfile(form : NgForm){
      console.log(form.value);
      console.log(this.model);
      let userProfileData = new FormData();
      this.userService.saveUserProfile(userProfileData).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });

   
  }

  selectChange( $event) {
    console.log($event);
    this.model.nationality = $event;
    // this.setNationality.selectedOption = $event;
      }

}
