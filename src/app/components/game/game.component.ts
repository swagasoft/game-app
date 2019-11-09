import { UserService } from './../../shared/user.service';
import { Router } from '@angular/router';
import { GameServiceService } from './../../shared/game-service.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  constructor(public gameService: GameServiceService,
              public userService: UserService,
              public alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.gameService.gameTimer();
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
          header: 'Continue to game ?',
          message: ' <strong class="text-dark"> You are about to start a game that will last $ min</strong>!!!',
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
          this.router.navigate(['/start-game']);
             
              }
            }
          ]
        });
    
        await alert.present();
      }

    

}
 