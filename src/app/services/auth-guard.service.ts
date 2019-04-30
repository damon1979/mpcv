import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot,  CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private us: UserService) { }
    canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean  {
	// la garde est ici
	if (this.us.isAuth === true) {
	    return true;
	}
	else {
	    this.router.navigate(['/login']);
	}
    }
}
