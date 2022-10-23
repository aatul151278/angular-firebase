import { Injectable } from '@angular/core';

import { AngularFirestore } from "@angular/fire/compat/firestore/";

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: AngularFirestore) { }

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
}
