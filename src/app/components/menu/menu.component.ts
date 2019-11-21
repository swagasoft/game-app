import { Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {}


  logout(){
    this.userService.logout();
  }
  gotoWelcome(){
    this.router.navigate(['welcome']);
  }
  goleaderboard(){
    this.router.navigate(['leaderboard']);
  }

  gotoProfile(){
    this.router.navigate(['profile']);
  }
  gotoGame(){
    this.router.navigate(['game']);
  }
  gotoGameRecord(){
    this.router.navigate(['game-record']);
  }
gotoAccount(){
  this.router.navigate(['account']);
}
gotoSettings(){
  this.router.navigate(['settings']);
}
gotoAdmin(){
  this.router.navigate(['admin-upload']);
}
}
