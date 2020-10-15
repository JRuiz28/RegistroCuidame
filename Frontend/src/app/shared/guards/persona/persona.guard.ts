import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const user = JSON.parse(window.localStorage.getItem('user'));

    if(user.id_rol === 3){
      return true;
    }  
    
    if(user.id_rol == 2){
      this.router.navigate(["/company"]);
    }
    if(user.id_rol == 1){
      this.router.navigate(["/admin"]);
    }
    
    return false;
  }
  
}
