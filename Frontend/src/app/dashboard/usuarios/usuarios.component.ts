import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token/token.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public user = JSON.parse(window.localStorage.getItem('user'));
  public actividades;
  public n: number = 0;

  constructor(
    private _token: TokenService, 
    private _router: Router, 
    private _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this._usuarioService.listUser(this.user.id).toPromise()
    .then(data => {
      this.actividades = data;
      this.n = this.actividades.length;
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  cerrarSesion(){
    this._token.removeToken();
    window.localStorage.removeItem('user');
    this._router.navigate(["/"]);
  }

}
