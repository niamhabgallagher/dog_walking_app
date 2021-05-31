import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  // doLogout(){
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.signOut()
  //     .then(() => {
  //       this.firebaseService.unsubscribeOnLogOut();
  //       resolve();
  //     }).catch((error) => {
  //       reject();
  //     });
  //   })
  // }
}
