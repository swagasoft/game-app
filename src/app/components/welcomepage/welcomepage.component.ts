import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

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


  constructor(private userService: UserService, private menu: MenuController) { }

  ngOnInit() {
    this.countDown();
    this.countHours = 2222222;
    
  }

  logout(){
    this.userService.logout();
  }
 

  countDown(){
    var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countDays = days;
      this.countHour = hours;
      this.countminutes = minutes;
      this.countSeconds = seconds;
      
      
      
      console.log('seconds' , this.countSeconds);
    
      // Display the result in the element with id="demo"
      document.getElementById("demo").innerHTML = days + "D " + hours + "H "
      + minutes + "M " + seconds + "S";

      
    
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }

}
