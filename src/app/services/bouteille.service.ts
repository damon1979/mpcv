import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Bouteille } from '../modele/bouteille';
import { UserService } from './user.service';
@Injectable({
    providedIn: 'root'
})
export class BouteilleService {
    bouteilleCollection: AngularFirestoreCollection<Bouteille>;
    bouteilles$: Observable<Bouteille[]>;
    appellationFilter$: BehaviorSubject<string | null>;
    typeFilter$: BehaviorSubject<string | null>;
    couleurFilter$: BehaviorSubject<string | null>;
    cepageFilter$: BehaviorSubject<string | null>;
    accompagnementFilter$: BehaviorSubject<string | null>;



    constructor(private us: UserService, private afs: AngularFirestore) {
        this.bouteilleCollection = this.afs.collection<Bouteille>('bouteilles');

        this.appellationFilter$ = new BehaviorSubject(null);
        this.couleurFilter$ = new BehaviorSubject(null);
        this.typeFilter$ = new BehaviorSubject(null);
        this.cepageFilter$ = new BehaviorSubject(null);
        this.accompagnementFilter$ = new BehaviorSubject(null);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                // les bouteilles
                this.bouteilles$ = combineLatest(
                    this.appellationFilter$,
                    this.accompagnementFilter$,
                    this.cepageFilter$,
                    this.couleurFilter$,
                    this.typeFilter$
                ).pipe(
                    switchMap((
                        [
                            appellation,
                            accompagnement,
                            ceppage,
                            couleur,
                            type
                        ]
                    ) =>
                        afs.collection<Bouteille>('bouteilles', (ref) => {
                            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                            query = query.where('owner', '==', user.uid);
                            if (appellation) {
                                query = query.where('appellation', '==', appellation);
                            }
                            if (accompagnement) {
                                query = query.where('accompagnements', 'array-contains', accompagnement);
                            }
                            if (ceppage) {
                                query = query.where('ceppages', 'array-contains', ceppage);
                            }
                            if (couleur) {
                                query = query.where('couleur', '==', couleur)
                            }
                            if (type) {
                                query = query.where('type', '==', type);
                            }
                            return query;
                        }
                        ).valueChanges()
                    ));

            }
            else {

            }
        });
    }
    private initBouteilleDoc(id: string): AngularFirestoreDocument<Bouteille> {
        return this.afs.doc('bouteilles/' + id)

    }

    persist(bouteille: Bouteille) {
        var id: string;
        if (bouteille.id) {
            id = bouteille.id;
            return this.initBouteilleDoc(id).set(bouteille);
        }
        else {
            bouteille.owner = this.us.user.uid;
            id = this.afs.createId();
            return this.bouteilleCollection.doc(id).set(bouteille);
        }

    }
    getSingle(id: string): Observable<Action<DocumentSnapshot<Bouteille>>> {
        return this.initBouteilleDoc(id).snapshotChanges();
    }
    remove(id: string) {

        return this.initBouteilleDoc(id).delete();
    }
}
