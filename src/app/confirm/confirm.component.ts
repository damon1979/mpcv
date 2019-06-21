import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bouteille } from '../modele/bouteille';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

    constructor(
        private mdr: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Bouteille
    ) { }
    onNoclick(): void {
        this.mdr.close();
    }


}
