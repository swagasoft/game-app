import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../../shared/user.service';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {  IonSlides, MenuController  } from '@ionic/angular';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  @ViewChild('mySlider', {static : false}) mySlider: IonSlides;

gameTime: any;
timeMinute: any = 0;
timeSeconds: any = 0;
gameOver = false;
clickedDisable : boolean;
timer: number;
gameQuestions: any;
setQuestions: Observable<any>;
loadingGame = false;
correctAns: any = 0;
wrongAns: any = 0;

GameTimeMinute: any = 0;
GameTimeSeconds: any = 0;

  constructor(private userService: UserService,
              private router: Router,   public menu: MenuController) {
       this.loadingGame = true;
       this.gameOver = false;
       this.getQuestionForGame();
       console.log('START GAME CONSTRUCT');


  }

  gameModel = {
    question : '',
    answer  : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    id: ''

  };


  ngOnInit() {
  

  }
  slideToNext() {
    this.mySlider.slideNext(); 
  }


  startTimer(duration: any, display) {
    let timer = duration, minutes, seconds;
    setInterval( () => {
        this.timeMinute = timer / 60;
        this.timeSeconds = timer % 60;

        // this.timeMinute = this.timeMinute < 10 ? "0" + this.timeMinute : this.timeMinute;
        // this.timeSeconds = this.timeSeconds < 10 ? + this.timeSeconds: this.timeSeconds;

        display.textContent = this.timeMinute + ':' + this.timeSeconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

  startGameTime() {
    const fiveMinutes = 60 * 4,
        display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
}



getQuestionForGame() {
  this.userService.getRandomQuestionsForGame().subscribe(
    res => {
      this.gameQuestions = res;
      console.log('GSME IS READY')
      this.loadingGame = false;

      setTimeout(() => {
          this.countDownTime();
        }, 2000);
      console.log(this.gameQuestions);
    },
    err => {
      // this.loadingGame = false;
      console.log(err);
    }
  );
}

userSelect(selectOption, correctAnswer) {
        this.clickedDisable = true;
     if (selectOption === correctAnswer){
    this.correctAns = this.correctAns + 1;
      } else {
    this.wrongAns = this.wrongAns + 1;
    }
     const TOTAL  = this.wrongAns + this.correctAns;
      this.slideToNext();
     
     if (TOTAL === 15) {
       setTimeout(()=> {
        this.gameisOver();
       }, 1000);
     
    }
}

gameisOver(){
this.GameTimeMinute = this.timeMinute;
this.GameTimeSeconds = this.timeSeconds;
this.gameOver = true;
this.loadingGame = true;

const minutes = ( 3 - this.timeMinute );
const seconds = (60 - this.timeSeconds );
let correct_qst = this.correctAns;
let wrong_qst = this.wrongAns;

const record = {minutes , seconds, correct_qst, wrong_qst};
console.log( minutes, seconds);
this.userService.postQuestionRecord(record).subscribe(
    res => {
      this.gameOver = false;
      console.log('RESPONSE');
      setTimeout(()=> {
        this.router.navigate(['/game']);
      }, 3000);
    }
  );


}



countDownTime() {
   // COUNTDOWN IN SECONDS
  // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
  let counter = 240;


  // Start if not past end date
  if (counter > 0) {
    const ticker = setInterval(() => {
      // Stop if passed end time
      counter--;
      if (counter <= 0) {
        clearInterval(ticker);
        counter = 0;
        if(!this.gameOver){
          this.gameisOver();
        }else{
          console.warn('already end...');
        }
       
      }

      // Calculate remaining time
      let secs = counter;
      const mins  = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;

      this.timeMinute = mins;
      this.timeSeconds = secs;

    }, 1000);
  }
}



}


