import { Injectable } from '@angular/core';
import { Bouteille } from '../modele/bouteille';
import * as firebase from 'firebase/app';
import { DocumentSnapshot, Action, AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class BouteilleService {
    bouteilleCollection: AngularFirestoreCollection<Bouteille>;
    bouteilleDoc: AngularFirestoreDocument<Bouteille>;

    constructor(private us: UserService, private afs: AngularFirestore) {
	firebase.auth().onAuthStateChanged((user) => {
	    if (user) {
		this.bouteilleCollection = this.afs.collection('bouteilles', ref => ref.where('owner', '==', user.uid));
	    }
	    else {
		this.bouteilleCollection = null;
	    }
	});
    }
    initBouteilleDoc(id: string) {
	this.bouteilleDoc = this.afs.doc<Bouteille>('bouteilles/' + id);
    }
    getAll(): Observable<Bouteille[]> {
	return this.bouteilleCollection.valueChanges();
    }
    persist(bouteille: Bouteille) {
	var id: string;
	if (bouteille.id) {
	    id = bouteille.id;
	    return this.bouteilleDoc.set(bouteille);
	}
	else {
	    bouteille.owner = this.us.user.uid;
	    id = this.afs.createId();
	    return this.bouteilleCollection.doc(id).set(bouteille);
	}
	
    }
    getSingle(id: string): Observable<Action<DocumentSnapshot<Bouteille>>> {
	this.initBouteilleDoc(id);
	return this.bouteilleDoc.snapshotChanges();
    }
    remove(id: string) {
	this.initBouteilleDoc(id);
	return this.bouteilleDoc.delete();
    }
}
