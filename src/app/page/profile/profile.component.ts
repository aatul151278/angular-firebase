import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreDataService } from 'src/app/service/firestore-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  LoginUserDetail: any = null;
  constructor(
    public firestoreDataService: FirestoreDataService,
    public authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private _router: Router

  ) {
    this.ngxService.start();
    this.getLoginUserDetail();
  }

  ngOnInit(): void {
  }

  getLoginUserDetail = async () => {
    this.LoginUserDetail = await this.firestoreDataService.getUser(localStorage.getItem('uid'));
    this.ngxService.stop();
  }

  signOut = async () => {
    this.ngxService.start();
    await this.authService.SignOut();
    this.ngxService.stop();
    this.authService.resetLogin();
    this._router.navigate(['sign-in']);
  }
}
