import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private _http: HttpClient) { }
  
  setUsuario(data) {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(environment.REGISTER, params, {headers: headers});
  }
}

