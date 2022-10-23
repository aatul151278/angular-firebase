import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

import { AngularFirestore } from "@angular/fire/compat/firestore/";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: AngularFirestore, private fns: AngularFireFunctions) { }

  saveUser = async (objUser: any) => {
    if (objUser.isNewUser) {
      await this.firestore
        .collection("User")
        .doc(objUser.uid)
        .set({
          uid: objUser.uid,
          email: objUser.profile.email,
          name: objUser.profile.name,
          providerId: objUser.providerId,
          picture: objUser.profile.picture,
        })
    }
  }

  getUser = async (uid: any): Promise<any> => {
    return new Promise(async (resolve) => {
      try {
        if (uid) {
          const snapshot = await this.firestore
            .collection("User")
            .doc(uid).get();
          let objUser = null;
          await snapshot.forEach(async (doc) => {
            objUser = doc.data();

          });
          return resolve(objUser);
        } else {
          return resolve(null);
        }
      } catch {
        return resolve(null);
      }
    });
  }

  createEmployee = async (objEmployee: any) => {
    return new Promise(async (resolve) => {
      const callable = this.fns.httpsCallable('employeefunctions/AddEmployee');
      const resCreateEmployee = callable(objEmployee);
      resCreateEmployee.subscribe(resVal => {
        return resolve(resVal);
      })
    });
  }

  getEmployees = async (objEmployeeFilter: any): Promise<any> => {
    return new Promise(async (resolve) => {
      const callable = this.fns.httpsCallable('employeefunctions/GetEmployee');
      const resEmployees = callable(objEmployeeFilter);
      resEmployees.subscribe(resVal => {
        return resolve(resVal);
      });
    });
  }

  deleteEmployee = async (uid: any): Promise<any> => {
    return new Promise(async (resolve) => {
      await this.firestore
        .collection("Employee")
        .doc(uid).delete();
      return resolve(true);
    });
  }
}
