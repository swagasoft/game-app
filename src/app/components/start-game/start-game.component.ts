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
    this.gameOver = false;
    this.start();

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

  start () {
    var fiveMinutes = 60 * 4,
        display = document.querySelector('#time');
    this.startTimer(fiveMinutes, display);
}
 

getQuestionForGame(){
  console.log('FIRES QQQ')
  this.userService.getRandomQuestionsForGame().subscribe(
    res => {
      this.gameQuestions = res;
      console.log(this.gameQuestions);
    },
    err => {
      console.log(err);
    }
  );
}

userSelect(option){
  console.log('you have selected..',option);
}


}


