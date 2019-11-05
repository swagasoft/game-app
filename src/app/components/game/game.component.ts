import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
gameOver: boolean;
public gameLive: boolean;

  constructor() { }

  ngOnInit() {
    this.gameLive = false;
    this.gameTimer();
  }

   // timer
   gameTimer() {
    var deadline = new Date('nov 5, 2019 15:41:25').getTime();
    
    var x = setInterval(()=> {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24)).toString();
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString();
    var seconds = Math.floor((t % (1000 * 60)) / 1000).toString();
    document.getElementById('day').innerHTML = days ;
    document.getElementById('hour').innerHTML = hours;
    document.getElementById('minute').innerHTML = minutes;
    document.getElementById('second').innerHTML = seconds;
    
    if (t < 0) {
      this.goLive();
            clearInterval(x);
            // document.getElementById('demo').innerHTML = '';
            document.getElementById('day').innerHTML = '0';
            document.getElementById('hour').innerHTML = '0';
            document.getElementById('minute').innerHTML = '0' ;
            document.getElementById('second').innerHTML = '0'; 
          
          }
    }, 1000);
    
      }

      startGame(){

      }

      goLive(){
        console.log('going live...');
        this.gameLive = true;
      }

}
