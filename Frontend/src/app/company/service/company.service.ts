import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private _http: HttpClient
  ) { }

  checkUser(data){
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(environment.CHECK, params, {headers: headers});
  }

  setEvent(data){
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(environment.CREATE, params, {headers: headers});
  }

  setUsuario(data) {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(environment.REGISTER, params, {headers: headers});
  }
}
