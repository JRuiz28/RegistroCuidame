const url="http://127.0.0.1:8000/api/";

export const environment = {
  production: false,
  LOGIN: url+'login',
  REGISTER: url+'register',
  USER: url+'evento/user',
  CHECK: url+'evento/check',
  CREATE: url+'evento/create',
  LISTARPERSONA: url+ 'evento/list/persona/',
  LISTAREMPRESA: url+ 'evento/list/empresa/{id}',
  LISTAR: url+'evento/list/all',
  NUMERODOCU: url+'evento/list/numeroDoc/',
  COUNT: url+'count'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
