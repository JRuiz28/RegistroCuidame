import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  public numero_evento: number = 0;
  public numero_empresa: number = 0;
  public numero_persona: number = 0;
  public cards = [];

  constructor(
    private _adminService: AdminService
  ) {
    this.cargarDashboard(); 
  }

  cargarDashboard(){
    this._adminService.getDatos().toPromise()
    .then(data => {
      console.log(data);// array 0 = event / 1 = empresa / 2 = persona
      this.numero_evento = data[0].Num;
      this.numero_empresa = data[1].Num;
      this.numero_persona = data[2].Num;

      this.cards = [
        { title: 'Eventos', cols: 2, rows: 1, content: this.numero_evento },
        { title: 'Empresas', cols: 1, rows: 1, content: this.numero_empresa },
        { title: 'Personas', cols: 1, rows: 1, content: this.numero_persona }
      ];
    })
    .catch( error => {
      console.log(error)
    })
  }
  
}
