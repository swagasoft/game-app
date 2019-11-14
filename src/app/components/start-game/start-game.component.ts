import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
gameTime: any;
timeMinute: any = 0;
timeSeconds: any = 0;
gameOver: boolean;
timer: number;
gameQuestions: any;
setQuestions: Observable<any>;
loadingGame: boolean;
correctAns: any = 0;
wrongAns: any = 0;

GameTimeMinute: any = 0;
GameTimeSeconds: any = 0;

  constructor(private userService: UserService) {

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
    this.getQuestionForGame();
    this.loadingGame = true;
    this.gameOver = false;


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
    let fiveMinutes = 60 * 4,
        display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
}



getQuestionForGame() {
  this.userService.getRandomQuestionsForGame().subscribe(
    res => {
      this.gameQuestions = res;
      this.loadingGame = false;

      setTimeout(() => {
          this.countDownTime();
        }, 2000);
      console.log(this.gameQuestions);
    },
    err => {
      this.loadingGame = false;
      console.log(err);
    }
  );
}

userSelect(selectOption, correctAnswer) {
  console.warn('SELECT=', selectOption, correctAnswer);
  if (selectOption == correctAnswer) {
    console.log('CORRECT!');
    this.correctAns = this.correctAns + 1;
  } else {
    console.log('WRONG');
    this.wrongAns = this.wrongAns + 1;
  }
    console.log('I AM HERE..', console.log(this.timeMinute ,this.timeSeconds));
  if(this.wrongAns + this.correctAns === 15){
    console.warn(this.wrongAns + this.correctAns);
        this.gameisOver();
  }
}

gameisOver(){
this.GameTimeMinute = this.timeMinute;
this.GameTimeSeconds = this.timeSeconds;
this.gameOver = true;
this.loadingGame  = true;

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
        this.gameisOver();
      }

      // Calculate remaining time
      let secs = counter;
      let mins  = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;

      this.timeMinute = mins;
      this.timeSeconds = secs;

    }, 1000);
  }
}



}


