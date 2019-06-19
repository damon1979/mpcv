import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bouteille } from 'src/app/modele/bouteille';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BouteilleService } from 'src/app/services/bouteille.service';
import { Subscription } from 'rxjs';
import { docChanges } from '@angular/fire/firestore';
import { Unique } from 'src/app/services/validators/unique.service';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
    ready: boolean;
    edition: string;
    bouteille: Bouteille;
    editBouteilleForm: FormGroup;
    docChangeSubscription: Subscription;


    constructor(private fb: FormBuilder, private router: Router, private bs: BouteilleService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.ready = false;
        this.bouteille = {};
        if (this.route.snapshot.params['id']) {
            this.edition = 'Mise à jour';
            let id: string;
            id = this.route.snapshot.params['id'];
            this.docChangeSubscription = this.bs.getSingle(id).subscribe((docChanges) => {
                if (docChanges) {
                    this.bouteille = docChanges.payload.data();
                    this.bs.mettreAJour.next(this.bouteille)
                    this.initForm();
                    this.ready = true;
                }
                else {
                    this.bs.mettreAJour.next(null);
                    console.log('Pas de bouteille.')
                }
            });
        }
        else {
            this.edition = 'Ajout';
            this.bs.mettreAJour.next(null);
            this.initForm();
            this.ready = true;
        }


    }
    ngOnDestroy() {
        if (this.docChangeSubscription) {
            this.docChangeSubscription.unsubscribe();
        }
    }
    initForm() {
        var dateActuelle = new Date();
        this.editBouteilleForm = this.fb.group({
            emplacement: [
                this.bouteille.emplacement ? this.bouteille.emplacement : '', [
                    Validators.required, Validators.pattern(/^[A-Z]+[1-9]+[0-9]*$/)
                ],
                [
                    Unique.create(this.bs)
                ]
            ],
            appellation: [
                this.bouteille.appellation ? this.bouteille.appellation : '', Validators.required
            ],
            type: [
                this.bouteille.type ? this.bouteille.type : '', [
                    Validators.required
                ]
            ],
            couleur: [
                this.bouteille.couleur ? this.bouteille.couleur : '', Validators.required
            ],
            millesime: [
                this.bouteille.millesime ? this.bouteille.millesime : '', [
                    Validators.min(1900),
                    Validators.required,
                    Validators.max(dateActuelle.getFullYear())
                ]
            ],
            garde: [
                this.bouteille.garde ? this.bouteille.garde : '', [
                    Validators.min(1)
                ]
            ],
            source: this.bouteille.source ? this.bouteille.source : '',
            commentaire: this.bouteille.commentaire ? this.bouteille.commentaire : '',
            cepages: this.fb.array(this.bouteille.cepages ? this.bouteille.cepages : []),
            accompagnements: this.fb.array(this.bouteille.accompagnements ? this.bouteille.accompagnements : []),
            domaine: this.bouteille.domaine ? this.bouteille.domaine : ''
        });
    }
    getArray(label: string): FormArray {
        return this.editBouteilleForm.get(label) as FormArray
    }
    onAddElement(label: string) {
        const newControl = this.fb.control(null, Validators.required)
        this.getArray(label).push(newControl)
    }
    onDelElement(label: string, index: number) {
        this.getArray(label).removeAt(index)
    }
    onEdit() {
        const editForm = this.editBouteilleForm.value;
        this.bouteille.accompagnements = editForm['accompagnements'] ? editForm['accompagnements'] : [];
        this.bouteille.appellation = editForm['appellation'];
        this.bouteille.cepages = editForm['cepages'] ? editForm['cepages'] : [];
        this.bouteille.commentaire = editForm['commentaire'];
        this.bouteille.couleur = editForm['couleur'];
        this.bouteille.domaine = editForm['domaine'];
        this.bouteille.emplacement = editForm['emplacement'];
        this.bouteille.garde = editForm['garde'];
        this.bouteille.millesime = editForm['millesime'];
        this.bouteille.source = editForm['source'];
        this.bouteille.type = editForm['type'];
        this.bs.persist(this.bouteille)
            .then(() => {
                this.router.navigate(['']);
            });
    }
}
