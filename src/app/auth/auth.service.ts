import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    userState: any;

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }
  
    SignIn(email, password) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user).then(
            () => this.router.navigate(["dashboard"])
          );        
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
  
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      })
    }  
}