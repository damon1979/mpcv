import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, take, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BouteilleService } from '../bouteille.service';
export class Unique {


    static create(bs: BouteilleService): AsyncValidatorFn {
        var error = {};
        error['exists'] = true;
        // le validateur sera implémenté ici
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return bs.bouteilles$.pipe(debounceTime(500), take(1), map(bouteilles => {
                for (let bouteille of bouteilles) {
                    if (bouteille.emplacement == control.value) {
                        if (!bs.mettreAJour.getValue()) {
                            return error;
                        }
                        else {
                            if (bouteille.id != bs.mettreAJour.getValue().id) {
                                return error;
                            }
                        }
                    }
                }
                return null;
            }));
        };
    }
}
