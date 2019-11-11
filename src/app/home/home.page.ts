import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  constructor(private router: Router, private nativeAudio: NativeAudio) {}

  ngOnInit() {
    this.gameTimer();
    // this.playAudio();

  }

  TestMode() {
    this.router.navigate(['/game']);
  }

  // timer
  gameTimer() {
var deadline = new Date('dec 31, 2019 15:37:25').getTime();

var x = setInterval(function() {

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
        clearInterval(x);
        document.getElementById('demo').innerHTML = 'TIME UP';
        document.getElementById('day').innerHTML = '0';
        document.getElementById('hour').innerHTML = '0';
        document.getElementById('minute').innerHTML = '0' ;
        document.getElementById('second').innerHTML = '0'; }
}, 1000);
  }

  submitEmail() {
    console.log('mail sent!');
  }

  // playAudio() {
  //   this.nativeAudio.preloadSimple('uniqueId1', '../../../assets/tracks/background1.mp3').then(() => {
  //     console.log('checking file');
      
  //   this.nativeAudio.play('uniqueId1').then(() => {
  //     console.log('now playing......');
  //   });

  //   });
  // }
}

