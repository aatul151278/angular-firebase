import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentPage: any;
  IsLogin: Boolean = false;

  constructor(private _router: Router) {
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentPage = val.url;
        if (val.urlAfterRedirects.includes('/sign-in')) {
          this.IsLogin = true;
        } else {
          this.IsLogin = false;
        }
      }
    });
  }

  ngOnInit(): void {
  }
}
