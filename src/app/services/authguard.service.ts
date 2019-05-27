import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private af: AngularFireAuth) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        // la garde est ici
        return this.af.authState.pipe(
            map((userInfo) => {
                if (!userInfo) {
                    this.router.navigateByUrl('login');
                    return false;
                }
                return true;
            })
        ).pipe(take(1));
    }
}
