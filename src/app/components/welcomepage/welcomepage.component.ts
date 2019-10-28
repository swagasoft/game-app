import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss'],
})
export class WelcomepageComponent implements OnInit {

  constructor(private userService: UserService, private menu: MenuController) { }

  ngOnInit() {
    
  }

  logout(){
    this.userService.logout();
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
