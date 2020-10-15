import { Injectable } from '@angular/core';

/**
 * Servicio de utilidad para modificacion y lectura del token desde el local storage
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor( ) {}
  
  /**
   * Obtiene el token de autenticacion del local storage
   */
  getToken() {
    return window.localStorage.getItem('access_token');
  }

  /**
   * Da valor al token en el local storage
   * @param value valor del token
   */
  setToken(value: string) {
    window.localStorage.setItem('access_token', value);
  }

  /**
   * Elimina el token del local storage.
   * Al acceder a la llave retornará null
   */
  removeToken() {
    window.localStorage.removeItem('access_token');
  }

}
