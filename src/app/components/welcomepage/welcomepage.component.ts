import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss'],
})
export class WelcomepageComponent implements OnInit {
  countDays: any;
  countHours:any;
  countMinutes: any;
  countSeconds: any;
  randomTip: any;


  constructor(private userService: UserService,
    private router: Router, private menu: MenuController) { }

  ngOnInit() {
    this.appTimer();


  }

  logout(){
    this.userService.logout();
  }
  login(){
    this.router.navigate(['/game']);
  }
  // timer
  appTimer() {
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
    
    getRandomTip(){
      this.userService.getRandomTips().subscribe(
        response => {
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
    }
 



}
