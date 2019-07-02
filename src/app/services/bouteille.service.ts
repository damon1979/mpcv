import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Bouteille } from '../modele/bouteille';
import { UserService } from './user.service';
@Injectable({
    providedIn: 'root'
})
export class BouteilleService {
    mettreAJour: BehaviorSubject<Bouteille | null>;
    dateFilter$: BehaviorSubject<number | null>;
    millesimeFilter$: BehaviorSubject<number>;
    bouteilleCollection: AngularFirestoreCollection<Bouteille>;
    bouteilles$: Observable<Bouteille[]>;
    appellationFilter$: BehaviorSubject<string | null>;
    typeFilter$: BehaviorSubject<string | null>;
    couleurFilter$: BehaviorSubject<string | null>;
    cepageFilter$: BehaviorSubject<string | null>;
    accompagnementFilter$: BehaviorSubject<string | null>;
    degustationFilter$: BehaviorSubject<boolean>;
    domaineFilter$: BehaviorSubject<string | null>;



    constructor(private us: UserService, private afs: AngularFirestore) {
        this.mettreAJour = new BehaviorSubject(null);
        this.dateFilter$ = new BehaviorSubject(null);
        this.millesimeFilter$ = new BehaviorSubject(null);
        this.bouteilleCollection = this.afs.collection<Bouteille>('bouteilles');

        this.appellationFilter$ = new BehaviorSubject(null);
        this.couleurFilter$ = new BehaviorSubject(null);
        this.typeFilter$ = new BehaviorSubject(null);
        this.cepageFilter$ = new BehaviorSubject(null);
        this.accompagnementFilter$ = new BehaviorSubject(null);
        this.degustationFilter$ = new BehaviorSubject(false);
        this.domaineFilter$ = new BehaviorSubject(null);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                // les bouteilles
                this.bouteilles$ = combineLatest(
                    this.appellationFilter$,
                    this.accompagnementFilter$,
                    this.cepageFilter$,
                    this.couleurFilter$,
                    this.typeFilter$,
                    this.degustationFilter$,
                    this.domaineFilter$,
                    this.dateFilter$,
                    this.millesimeFilter$
                ).pipe(
                    switchMap((
                        [
                            appellation,
                            accompagnement,
                            cepage,
                            couleur,
                            type,
                            degustation,
                            domaine,
                            date,
                            millesime
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
                            if (cepage) {
                                query = query.where('cepages', 'array-contains', cepage);
                            }
                            if (couleur) {
                                query = query.where('couleur', '==', couleur)
                            }
                            if (type) {
                                query = query.where('type', '==', type);
                            }
                            query = query.where('degustation', '==', degustation);
                            if (domaine) {
                                query = query.where('domaine', '==', domaine);
                            }
                            if (date) {
                                query = query.where('dateConso', '==', date);
                            }
                            if (millesime) {
                                query = query.where('millesime', '==', millesime);
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
        bouteille.dateConso = bouteille.millesime + bouteille.garde;
        var id: string;
        if (bouteille.id) {
            id = bouteille.id;
            return this.initBouteilleDoc(id).set(bouteille);
        }
        else {
            bouteille.owner = this.us.user.uid;
            bouteille.degustation = false;
            id = this.afs.createId();
            bouteille.id = id;
            return this.bouteilleCollection.doc(id).set(bouteille);
        }

    }
    getSingle(id: string): Observable<Action<DocumentSnapshot<Bouteille>> | null> {
        return this.initBouteilleDoc(id).snapshotChanges().pipe(
            map((docChange) => {
                if (!docChange.payload.exists) {
                    return null;
                }
                if (docChange.payload.data().owner == this.us.user.uid) {
                    return docChange;
                }
                else {
                    return null;
                }
            })
        );
    }
    remove(id: string) {

        return this.initBouteilleDoc(id).delete();
    }
    reinitFilters() {
        // méthode chargée de remettre tous les filtres à zéro.
        this.accompagnementFilter$.next(null);
        this.appellationFilter$.next(null);
        this.cepageFilter$.next(null);
        this.couleurFilter$.next(null);
        this.dateFilter$.next(null);
        this.domaineFilter$.next(null);
        this.degustationFilter$.next(false);
        this.millesimeFilter$.next(null);
        this.typeFilter$.next(null);

    }
}
