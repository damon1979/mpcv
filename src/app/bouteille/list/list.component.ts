import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Bouteille } from '../../modele/bouteille';
import { BouteilleService } from '../../services/bouteille.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentairedegustationComponent } from 'src/app/commentairedegustation/commentairedegustation.component';
import { ConfirmComponent } from 'src/app/confirm/confirm.component';
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
    constructor(private bs: BouteilleService, private router: Router, private dialog: MatDialog, private cs: CookieService) { }
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
    delete(bouteille: Bouteille) {
        const dialogRef = this.dialog.open(ConfirmComponent, { data: bouteille, width: '250px' })
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.bs.remove(data.id);
            }
        });
    }
    toggleDegust(bouteille: Bouteille) {
        if (bouteille.degustation) {
            bouteille.degustation = false;
            bouteille.emplacement = '';
            this.save(bouteille);
        }
        else {

            // ouverture de la modale permettant de saisir un commentaire de dégustation.
            this.openDialog(bouteille);
        }
    }
    save(bouteille: Bouteille) {
        this.bs.persist(bouteille)
            .then(() => {
                if (bouteille.emplacement == '') {
                    this.router.navigate(['add-bouteille/' + bouteille.id])
                }
            })
            .catch((e) => {
                // ouverture de la boîte de dialogue d'erreur
            });
    }
    openDialog(bouteille: Bouteille) {
        const dialogRef = this.dialog.open(CommentairedegustationComponent, { data: bouteille, width: '250px' })
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                bouteille = result;
                bouteille.degustation = true;
                this.save(bouteille);

            }
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
    appellationFiltre(input: string) {
        this.bs.appellationFilter$.next(input);
    }
    accompagnementFiltre(input: string) {
        this.bs.accompagnementFilter$.next(input);
    }
    couleurFiltre(input: string) {
        this.bs.couleurFilter$.next(input);
    }
    cepageFiltre(input: string) {
        this.bs.cepageFilter$.next(input);
    }
    typeFiltre(input) {
        this.bs.typeFilter$.next(input);
    }
    degustationFiltre(input) {
        if (input == 'En dégustation') {
            this.bs.degustationFilter$.next(true);
        }
        else if (input == 'En cave') {
            this.bs.degustationFilter$.next(false);
        }
    }
    domaineFiltre(input: string) {
        this.bs.domaineFilter$.next(input);
    }
    dateFiltre(input: number) {
        this.bs.dateFilter$.next(input);
    }
    millesimeFiltre(input: number) {
        this.bs.millesimeFilter$.next(input);
    }
}
