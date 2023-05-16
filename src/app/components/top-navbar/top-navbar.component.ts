import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {

  router: Router;
  constructor(
    private _router: Router
  ) {
    this.router = _router;
    console.log("router: ", this.router);
  }

}
