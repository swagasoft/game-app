import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
gameRecord: any;
loading: boolean = false;
  constructor(private userService: UserService , 
              public accountService: AccountService,
              public menu: MenuController,
              public toastController: ToastController,
              private router: Router) { 
                this.getRecord();
                if(this.userService.networkDisconnet){
                  this.presentFailNetwork();
              }
                console.log('RECORD CONSTRUCTOR');
  }

  ngOnInit() {
    
    this.getRecord();
    console.log('RECORD INIT FIRES');
    if(this.userService.networkDisconnet){
      this.presentFailNetwork();
  }

  

  }

  gotoGame(){
    this.router.navigate(['game']);
  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
      duration: 2000
    });
    toast.present();
  }

  getRecord() {
    this.loading = true;
    this.userService.getGameRecord().subscribe(
      response =>{
        this.gameRecord = response;
        this.loading = false;
        console.log(this.gameRecord);

      }
    );
  }

  deleteRecord(id){
    this.loading = true;
    this.userService.deleteGameRecord(id).subscribe( res => {
      this.getRecord();
      this.loading = false;
    },
    err => {
      this.loading = false;
      this.getRecord();
    });
  }
}
