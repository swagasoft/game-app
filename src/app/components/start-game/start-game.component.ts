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
timeMinute: any;
timeSeconds: any;
gameOver: boolean;
timer: number;
gameQuestions: any;
setQuestions: Observable<any>;
loadingGame: boolean;

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

  }


  ngOnInit() {
    this.getQuestionForGame();
    this.loadingGame = true;
    this.gameOver = false;
    

  } 
      
  
  startTimer(duration:any, display) {
    var timer = duration, minutes, seconds;
    setInterval( ()=> {
        this.timeMinute = timer / 60;
        this.timeSeconds = timer % 60;

        // this.timeMinute = this.timeMinute < 10 ? "0" + this.timeMinute : this.timeMinute;
        // this.timeSeconds = this.timeSeconds < 10 ? + this.timeSeconds: this.timeSeconds;

        display.textContent = this.timeMinute + ":" + this.timeSeconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

  startGameTime () {
    var fiveMinutes = 60 * 4,
        display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
}
 

getQuestionForGame(){
  this.userService.getRandomQuestionsForGame().subscribe(
    res => {
      this.gameQuestions = res;
      this.loadingGame = false;
    
      this.countDownTime();
      console.log(this.gameQuestions);
    },
    err => {
      this.loadingGame = false;
      console.log(err);
    }
  );
}

userSelect(selectOption, correctAnswer){
  console.warn('SELECT=',selectOption, correctAnswer);
  if (selectOption == correctAnswer) {
    console.log('CORRECT!');
  }else{
    console.log('WRONG');
  }
}


countDownTime(){
   // COUNTDOWN IN SECONDS
  // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
  let counter = 200;

  // Get the containers
  let min = document.getElementById("cd-min");
  let sec = document.getElementById("cd-sec");

  // Start if not past end date 
  if (counter > 0) {
    let ticker = setInterval(()=> {
      // Stop if passed end time
      counter--;
      if (counter <= 0) { 
        clearInterval(ticker); 
        counter = 0;
      }

      // Calculate remaining time
      var secs = counter;
      var mins  = Math.floor(secs / 60); // 1 min = 60 secs
      secs -= mins * 60;

      // Update HTML
      console.log(mins);
      console.log(secs);
      this.timeMinute = mins;
      this.timeSeconds = secs;
      
      // counter.min.innerHTML = mins;
      // counter.sec.innerHTML = secs;
    }, 1000);
  }
}



}


