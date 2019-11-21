import { AccountService } from './../../shared/account.service';
import { UserService } from './../../shared/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { GameServiceService } from './../../shared/game-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { timer } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
 appUser: any;
low_balance :boolean = false;

  constructor(public gameService: GameServiceService,
              public userService: UserService,
              public alertController: AlertController,
              public toastController: ToastController,
              public accountService: AccountService,
              public menu: MenuController,
              private router: Router) {
                    this.gameService.gameTimer();
                    console.log('GAME CONSTUCT!');
                    this.loadBalance();
                    this.ngOnInit();
                    if(this.userService.networkDisconnet){
                        this.presentFailNetwork();
                    }
               }


  ngOnInit() {
    // const subscribe = this.source.subscribe(val => console.log('time', val));
    this.appUser = localStorage.getItem('appUser');
    
  }
  async presentFailNetwork() {
    const toast = await this.toastController.create({
      message: 'No internet connection!!!',
    });
    toast.present();
  }

  openMenu() {
    this.menu.open();
    
  }
  goToRecoreds(){
    this.router.navigate(['game-record']);
  }
 
      startGame() {
        if (this.gameService.gameLive) {
          this.presentAlertConfirm();
        } else {
          console.log('not yet time!');
        }
      }

      async presentAlertConfirm() {
        const alert = await this.alertController.create({
          header: `CONTINUE TO GAME ?`,
          message: `<strong class="text-dark text-center"> You are about to start
           a game that will last <br> <h2 class="text-dark text-center"> 4 minutes</h2></strong>`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('cancle game');
              }
            }, {
              text: 'Yes',
              cssClass: 'success',
              handler: () => {
                
                let balance = this.accountService.accountBalance;
                this.accountService.loadBalanceForCalculation().subscribe(
                  res => {
                    console.log(res)
                    let UserBalance = res['balance'];
                    console.log('BALANCE', UserBalance);
                    if (UserBalance < 200){
                      this.low_balance = true;
                      setTimeout(()=> {
                        this.low_balance = false;
                      }, 6000);
                    }else{

                      this.accountService.deductGameAmountFromAccount().subscribe(
                        res => {
                          console.log('RESSSS');
                          this.accountService.loadMyBalance();
                          
                      this.router.navigate(['/start-game']);

                        },
                        error => {
                          console.log('ERROR');
                        }
                      );
                    }
                  }
                );
                
          
        
              }
            }
          ]
        });
    
        await alert.present();
      }

      loadBalance() {
        console.log('loading balance');
        this.accountService.loadMyBalance();
      } 

      makePayment(){
        this.router.navigate(['/account']);
      }

      

}
