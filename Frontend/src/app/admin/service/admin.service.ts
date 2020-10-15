import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient
  ) { }
  
  listAll(){
    return this._http.get(environment.LISTAR);
  }

  getList(data){
    return this._http.get(environment.NUMERODOCU + data);
  }

  getDatos(){
    return this._http.get(environment.COUNT);
  }
}
