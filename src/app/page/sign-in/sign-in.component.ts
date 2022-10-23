import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FirestoreDataService } from '../../service/firestore-data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public firestoreDataService: FirestoreDataService,
    private _snackBar: MatSnackBar,
    private ngxService: NgxUiLoaderService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.resetLogin();
  }

  signInWithGoogle = async () => {
    this.ngxService.start();
    const resUser: any = await this.authService.GoogleAuth();
    if (resUser.success) {
      await this.firestoreDataService.saveUser(resUser.user);
      this._snackBar.open(resUser.message, "Close", { duration: 3000 });
      this.ngxService.stop();
      this._router.navigate(['employee']);
    } else {
      this.ngxService.stop();
      this._snackBar.open(resUser.message, "Close", { duration: 5000 });
      localStorage.removeItem("xml_token");
    }
  }

}
