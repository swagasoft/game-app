import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
declare var NetworkInterface: any;

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  gameOver: boolean;
  public gameLive: boolean = false;
  public timeDays: any;
  public timeHours: any;
  public timeMinute: any;
  public timeSeconds: any;

  
  
  // tslint:disable-next-line: no-unused-expression
  constructor(private network: Network) { }


   // timer
   gameTimer() {
    let deadline = new Date('nov 5, 2019 16:11:25').getTime();
    
    let x = setInterval(()=> {
    let now = new Date().getTime();
    let t = deadline - now;
    this.timeDays = Math.floor(t / (1000 * 60 * 60 * 24)).toString();
    this.timeHours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    this.timeMinute = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
    this.timeSeconds = Math.floor((t % (1000 * 60)) / 1000).toString();
    
    if (t < 0) {
      this.gameLive = true;
      clearInterval(x);
      this.timeDays = '0';
      this.timeHours = '0';
      this.timeMinute = '0';
      this.timeSeconds = '0';
   
          }
    }, 1000);
      }

      
}




