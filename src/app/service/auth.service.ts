import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  resetLogin = () => {
    localStorage.setItem("uid", "");
    localStorage.setItem("LoginEmail", "");
  }

  isUserLogin = () => {
    return !!localStorage.getItem("uid");
  }

  // Sign in with Google
  GoogleAuth = () => {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin = (provider: any) => {
    this.resetLogin();


    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        if (result?.user?.uid) {
          localStorage.setItem("uid", result.user.uid)
          localStorage.setItem("LoginEmail", result.user.email)
          return ({ success: true, message: "Login successfully", user: { ...result.additionalUserInfo, uid: result.user.uid } })
        } else {
          return ({ success: false, message: "Error in Login" })
        }
      }).catch((error) => {
        return ({ success: false, message: "Error in Login:" + error })
      });
  }

  SignOut = async () => {
    await this.afAuth.signOut();
  }
}