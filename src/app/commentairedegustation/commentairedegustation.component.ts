import { Component, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bouteille } from '../modele/bouteille';
@Component({
    selector: 'app-commentairedegustation',
    templateUrl: './commentairedegustation.component.html',
    styleUrls: ['./commentairedegustation.component.css']
})
export class CommentairedegustationComponent {

    constructor(
        public dialogRef: MatDialogRef<CommentairedegustationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Bouteille
    ) { }
    cancel(): void {
        this.dialogRef.close();
    }



}
