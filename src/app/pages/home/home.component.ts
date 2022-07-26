import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ConsultoraService } from 'src/app/shared/services/consultora.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _consultoraService: ConsultoraService, private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getConsultoras()
  } 

  getClientes(){
    this._clienteService
      .getClientes()
      .subscribe()
  }

  getConsultoras(){
    this._consultoraService
      .getConsultoras()
      .subscribe(res => console.log(res))
  }

}
