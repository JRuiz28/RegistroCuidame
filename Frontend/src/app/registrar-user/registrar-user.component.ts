import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistrarService } from './service/registrar.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token/token.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  public registerUserForm: FormGroup;
  public contrasenia2: string;
  public rol: number;
  public error: number = 0;
  public advertencia: boolean = false;

  constructor(private FormBuilder: FormBuilder, private _register:RegistrarService, private _router:Router, private _token:TokenService) { }

  ngOnInit(): void {
    this.registerUserForm = this.FormBuilder.group({
      id_rol:           [ 2, [Validators.required]],
      name:             ['', [Validators.required]],
      tipo_documento:   ['', [Validators.required]],
      numero_documento: ['', [Validators.required]],
      telefono:         ['', [Validators.required]],
      direccion:        ['', [Validators.required]],
      email:            ['', [Validators.required, Validators.email]],
      password:         ['', [Validators.required, Validators.minLength(6)]]
    });
    this.rol = 2;
  }

  changeRol(e) {
    this.registerUserForm.get('id_rol').setValue(parseInt(e.target.value[3]), {
      onlySelf: true
    });
    this.validarDireccion (e.target.value[3]);
  }

  registrar() {    
    this.advertencia = false;
    this.error = 0;

    if(this.registerUserForm.value.id_rol == 2){
      if(this.registerUserForm.valid){
        this.consultaApi();
       }
      else{ //mensaje de espacios en blanco
        setTimeout( () => {
          this.advertencia = false;
        }, 10000);
        this.advertencia = true;
      }
    }
    else{
      if(this.registerUserForm.value.name.trim() != '' && this.registerUserForm.value.tipo_documento.trim() != '' && this.registerUserForm.value.numero_documento.trim() != '' && this.registerUserForm.value.telefono.trim() != '' && this.registerUserForm.value.email.trim() != '' && this.registerUserForm.value.password.trim() != '' ){
        this.consultaApi();
      }
      else{ //mensaje de espacios en blanco
        setTimeout( () => {
          this.advertencia = false;
        }, 10000);
        this.advertencia = true;
      }
    }
  }

  consultaApi(){
    if(this.registerUserForm.value.password.length >= 6) {
      if(this.registerUserForm.value.password.trim() == this.contrasenia2){
        
        this._register.setUsuario(this.registerUserForm.value).toPromise()
          .then(res => {
            this._router.navigate(['/']);
          })
          .catch(error =>{
            console.log('Hay un error al conectarse a la base de datos '+error);
          }); 
      }    
      else{
        this.error = 2;
      }
    }
    else{
      this.error = 1;
    }
  }

  validarDireccion(numeroRol): void{
    this.registerUserForm.get('direccion').setValue("", {});
    this.rol = numeroRol;
  }

  cerrar(){
    this.advertencia = false;
  }

}
