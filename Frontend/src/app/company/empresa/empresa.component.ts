import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token/token.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from '../service/company.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public eventoForm: FormGroup;
  public mostrarNomb: boolean;
  public user = JSON.parse(window.localStorage.getItem('user'));
  public id_persona: number;
  public enviar: boolean;
  public alert: number = 0;

  constructor(
    private FormBuilder: FormBuilder, 
    private _token: TokenService, 
    private _router: Router, 
    private _service: CompanyService
    ) { }

  ngOnInit(): void {
    this.nuevoForm();

    this.mostrarNomb = false;
    this.id_persona = 0;
    this.enviar = true;
  }

  nuevoForm(){
    this.eventoForm = this.FormBuilder.group({
      empresa:          [this.user.name, [Validators.required]],
      numero_documento: ['', [Validators.required]],
      name:             ['', [Validators.required]],
      temp:             ['', [Validators.required]]
    });
  }

  cerrarSesion(){
    this._token.removeToken();
    this._router.navigate(["/"]);
    window.localStorage.removeItem('user');
  }

  verificarNumero(){
    if(this.eventoForm.value.numero_documento.trim() != '')
    {
      this.buscarNumero();
    }
  }

  registrar(){
    setTimeout( () => {

      var evento = {
        id_empresa: this.user.id,
        id_persona: this.id_persona,
        temp: this.eventoForm.value.temp
      }

      if(this.mostrarNomb){
        if(this.eventoForm.valid){

        const user = {
          id_rol: 3,
          name: this.eventoForm.value.name,
          numero_documento: this.eventoForm.value.numero_documento
        }

        this.registrarUser(user);
        this.buscarNumero();
    
        setTimeout( () => {
          this.alert = 0;
        }, 7000);
        this.alert = 3;
        
      }
      else{
        this.alert = 1;
      }
  
      }
      else{
        if(this.eventoForm.value.empresa.trim() != '' && this.eventoForm.value.numero_documento.trim() != '' && this.eventoForm.value.temp.trim() != ''){
          
          this.crearEvento(evento);
          
        }
        else{
          this.alert = 1;
        }
      }
    }, 500);

  }

  crearEvento(evento){
    this._service.setEvent(evento).toPromise()
    .then(data => { 
      })
    .catch(error => { 
      console.log(error);
    })
    
    setTimeout( () => {
      this.alert = 0;
    }, 7000);
    this.alert = 4;

    this.nuevoForm();

  }

  registrarUser(user){
    this._service.setUsuario(user).toPromise()
    .then(res => {
    })
    .catch(error =>{
      console.log('Hay un error al conectarse a la base de datos '+error);
    }); 
  }

  buscarNumero(){
    this.id_persona = 0;
    this._service.checkUser({numero_documento: this.eventoForm.value.numero_documento}).toPromise()
      .then(data => {  

        if(data[0] === undefined ){
          this.mostrarNomb = true;
          this.enviar = false;

          setTimeout( () => {
            this.alert = 2;
          }, 100);
          this.alert = 0;
          
        }
        else{
          this.mostrarNomb = false;
          this.enviar = true;
          this.id_persona = data[0].numero;
          this.alert = 0;
        }
      })
      .catch(error =>{ 
          console.log(error);
      });
  }


}
