import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TokenService } from "../token/token.service";

@Injectable({ 
  providedIn: "root" 
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) {}

  /**
   * Activa este guard usando [LoginGuard]{} en la ruta donde quieras usarlo.
   *
   * Este guard revisa si existe el token en el local storage, en caso de existir redirige al dashboard.
   *
   * Este guard es usado para evitar que un usuario loggeado acceda al login.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = this.tokenService.getToken();
    const usuario = JSON.parse(window.localStorage.getItem('user'));
    
    if (token !== null) {

      if(usuario.id_rol == 1){
        this.router.navigate(["/admin"]);
      }
      if(usuario.id_rol == 2){
        this.router.navigate(["/company"]);
      }
      if(usuario.id_rol == 3){
        this.router.navigate(["/dashboard"]);
      }

      return false;
    }
    return true;
  }
}