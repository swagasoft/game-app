import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { AccountService } from './../../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {

  constructor(  public menu: MenuController,
    private userService: UserService,
    private router: Router,
    public toastController: ToastController,
    public accountServive: AccountService) {
      this.accountServive.getLeaderboard();
      this.accountServive.getLeaderboard(); 
      if (this.userService.networkDisconnet) {
        this.presentFailNetwork();
       
    }
     }

  ngOnInit() {


  }

  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }
  gotoGame(){
    this.router.navigate(['game']);
  }
}

