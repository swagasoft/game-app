import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  faq(){
    this.router.navigate(['/faq-section']);
  }
  
  howItWorks(){
    this.router.navigate(['/how-it-works']);
  }
  privacy(){
    this.router.navigate(['/privacy-section']);
  }
  contactUs(){
    this.router.navigate(['/contact-us']);
  }
}
