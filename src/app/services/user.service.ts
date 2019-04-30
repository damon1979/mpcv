import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    isAuth: boolean;
    public user;
    constructor(public afAuth: AngularFireAuth) {
	this.isAuth = false;
	firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
		this.isAuth = true;
		this.user = user;
	    }
	    else {
		this.user = null;
		this.isAuth = false;
	    }
	});
    }
    login(email: string, pwd: string) {
	return this.afAuth.auth.signInWithEmailAndPassword(email, pwd);
    }
    
    logout() {
	return firebase.auth().signOut();
    }
}
