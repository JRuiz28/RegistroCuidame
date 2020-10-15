import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit, AfterViewInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  displayedColumns: string[] = ['nombre_persona', 'nombre_empresa', 'direccion', 'temp', 'created_at'];
  public dataSource;
  public NumForm: FormGroup;
  
  constructor( 
    private _adminService: AdminService,
    private FormBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() {
    
    this.NumForm = this.FormBuilder.group({
      numero_documento: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.cargaTodo();
  }

  cargaTodo(){
    this._adminService.listAll().toPromise()
    .then( data => {
      // console.log(data);
      this.dataSource = data;
    })
    .catch(error => {
      console.log(error);
    });
  }

  buscar(){
    if(this.NumForm.value.numero_documento.trim() != ''){

      this._adminService.getList(this.NumForm.value.numero_documento).toPromise()
      .then( data => {
        if(data === null){
          this.openSnackBar('Número de documento no se encuentra registrado');
        }
        else{

          if(data[0] == undefined){
            this.openSnackBar('El usuario consultado, no se ha registrado en ningún evento');
          }
          
          this.dataSource = data;
        }
      })
      .catch( error => {
        console.log(error);
      });
    }
    else{
      this.cargaTodo();
      this.openSnackBar('Todos los eventos');
    }
  }
  
  openSnackBar(messange) {
    this._snackBar.open(messange, 'Ok', {
      duration: 10000
    });
  }
  
}
