import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public error: number = 0;

  constructor(
    private FormBuilder: FormBuilder, 
    private _login:LoginService, 
    private _router:Router, 
    private _token:TokenService
  ) { }

  ngOnInit(): void {
    this.clearForm();
  }

  login() {
  
    if(this.loginForm.valid){

      this._login.login(this.loginForm.value).toPromise()
      .then(data => {
        this.getDatos(data);
      }).catch(error =>{
        console.log(error);
        this.error = 2;
        this.clearForm();
      });     
    }
    else{
      setTimeout( () => {
        this.error = 0;
      }, 10000);
      this.error = 1;
    }
  }

  clearForm(): void{
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  cerrar(){
    this.error = 0;
  }

  getDatos(tok){
    this._login.getUser({email: this.loginForm.value.email}).toPromise()
    .then(data => {
      var user =  (data[0]);
      this._token.setToken(tok['token']);
      window.localStorage.setItem('user', JSON.stringify(user));

      if(user.id_rol == 1){
        this._router.navigate(['/admin']);
      }
      else if(user.id_rol == 2){
        this._router.navigate(['/company']);
      }
      else{
        this._router.navigate(['/dashboard']);
      }
    })
    .catch(error =>{
      console.log(error);
    });
  }

}
