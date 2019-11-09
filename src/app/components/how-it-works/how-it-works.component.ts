import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  startHere(){
    this.router.navigate(['/game']);
  }
}
