import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  model = {
    number: '',
    password: '',
    username: '',
    conf_password:''
  };

  register(){
    this.userService.registerUser( this.model).subscribe( 
      response => {
        console.log(response);
        
        
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit() {}

}
