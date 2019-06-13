import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bouteille } from '../../modele/bouteille';
import { BouteilleService } from '../../services/bouteille.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
    columnsToDisplay = [
        'emplacement',
        'appellation',
        'couleur',
        'type',
        'millesime',
        'domaine',
        'garde',
        'dateConso',
        'cepages',
        'accompagnements',
        'source',
        'commentaire',
        'id'
    ];
    bouteilleSubscription: Subscription;
    constructor(private bs: BouteilleService, private router: Router) { }
    goForUpdate(id: string) {
        this.router.navigate(['bouteille-add/' + id])
    }
    ngOnInit() {
        this.bouteilleSubscription = this.bs.bouteilles$.subscribe(
            (error) => {
                // à implémenter
            }
        );
    }
    togleDegust(bouteille: Bouteille) {
        if (bouteille.degustation) {
            bouteille.degustation = false;
            this.save(bouteille);
        }
        else {
            bouteille.degustation = true;
        }
    }
    save(bouteille: Bouteille) {
        this.bs.persist(bouteille)
            .catch((e) => {
                // ouverture de la boîte de dialogue d'erreur
            });
    }
    getDegustationState(bouteille: Bouteille): string {
        if (bouteille.degustation) {
            return 'Mettre en cave';
        }
        else {
            return 'Placer en degustation';
        }
    }
    ngOnDestroy() {
        this.bouteilleSubscription.unsubscribe();
    }

}
