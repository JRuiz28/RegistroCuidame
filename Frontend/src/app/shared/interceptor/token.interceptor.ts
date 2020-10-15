import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

export const WebClient = 'WebClient';
export const Files = 'Files';

/**
 * Interceptor para el envío del token de autenticación.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public token: string;

  constructor(private tokenService: TokenService) {}

  /**
   * Obtiene el token del localstorage.
   *
   * Usa [TokenService]{@link TokenService.html}
   */
  getToken() {
    return this.tokenService.getToken();
  }

  /**
   * Intercepta todas las peticiones http que hace la aplicacion y les inserta el token de autenticación en el header.
   * @param request
   * @param next
   */
  intercept( 
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.token = this.getToken();
    if (request.headers.has(WebClient)) {
      /**
       * Headers para el sitio web
       */
      return next.handle(
        request.clone({
          setHeaders: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      );
    } else if (request.headers.has(Files)) {
      /**
       * Files
       */
      console.log('Usando headers Files');
      request = request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Authorization: 'Bearer ' + this.token,
        },
      });
      return next.handle(request);
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token,
          Accept: 'application/json',
        },
      });
      return next.handle(request);
    }
  }
}