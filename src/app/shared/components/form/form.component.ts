import { environment } from './../../../../environments/environment';
import { Cliente } from './../../models/Cliente';
import { Consultora } from './../../models/Consultora';
import { AuthService } from './../../services/auth.service';
import { Timestamp } from 'firebase/firestore';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { ConsultoraService } from 'src/app/shared/services/consultora.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { FormStates } from '../../enum/formStates';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ConsultoraService, ClienteService],
})

export class FormComponent implements OnInit {
  @ViewChild('isOnlyClient') isOnlyClient: MatCheckbox;
  @ViewChild('isOnlyConsultant') isOnlyConsultant: MatCheckbox;
  stateForm: number = 0;

  consultoraEdit: any;
  clienteEdit: any;

  consultoraForm!: FormGroup;
  clienteForm!: FormGroup;

  tipoContrato: string;
  tipoContratoList: any = [];

  modalidadTrabajo: string;
  modalidadTrabajoList: any = [];
  
  constructor(
    private _consultoraService: ConsultoraService,
    private _clienteService: ClienteService,
    private _auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { 
    this.initForms();
    var navi = this.router.getCurrentNavigation();
    this.consultoraEdit = navi?.extras?.state;
    this.clienteEdit = navi?.extras?.state;
    this.stateForm = this.getState();
    this.tipoContrato = '';
    this.tipoContratoList = ['Indefinido', 'Temporal'];
    this.modalidadTrabajoList = ['Remoto', 'Híbrido', 'Presencial'];
  }

  ngOnInit(): void {
    //this.consultoraForm.patchValue(this.persona);
    //this.clienteForm.patchValue(this.persona);
  }

  private initForms(): void {   
    this.consultoraForm = this.formBuilder.group({
      reclutador: ['', [Validators.required]],
      empresa: [''],
      email: [''],
      fechaContacto: [Timestamp.fromDate(new Date()), [Validators.required]],
      fechaModificacion: [Timestamp.fromDate(new Date())],
      fechaCreacion: [Timestamp.fromDate(new Date()), [Validators.required]],
      ubicacion: [''],
      telefono: [''],
      observaciones: [''],
      cliente: [[]],
      usuario: [this._auth.getCurrentUser().uid, [Validators.required]]
    });

    this.clienteForm = this.formBuilder.group({
      nombreEmpresa: ['', [Validators.required]],
      personaContacto: [''],
      descripcionPuesto: [''],
      tipoContrato: [''],
      modalidadTrabajo: [''],
      ubicacion: [''],
      estadoPosicion: ['', [Validators.required]],
      favorito: [false, [Validators.required]],
      fechaCambioEstado: [Timestamp.fromDate(new Date())],
      fechaModificacion: [Timestamp.fromDate(new Date())],
      fechaCreacion: [Timestamp.fromDate(new Date()), [Validators.required]],
      motivoRechazo: [''], 
      observaciones: [''], 
      rechazado: [false], 
      rechazadoPor: [''], 
      usuario: [this._auth.getCurrentUser().uid, [Validators.required]]
    });
  }

  async onSave(){
    if(!this.isOnlyClient.checked){
      this.markConsultanAsTouched();
      this.saveConsultora();
    } else if(!this.isOnlyConsultant.checked){
      this.saveCliente();
    }
  }

  async saveConsultora(){
    if(environment.debug)console.log(this.consultoraForm);

    if (this.consultoraForm.valid) {
      try {
        const consultora: Consultora = this.consultoraForm.value;

        consultora.id = this.consultoraEdit?.id || null;  // Para saber si es edicion o es nuevo registro

        if (this.stateForm == FormStates.new)
          consultora.fechaCreacion = Timestamp.fromDate(new Date());
        else consultora.fechaCreacion = this.consultoraEdit.fechaCreacion;

        await this._consultoraService.createConsultora(consultora);

        if (this.stateForm == FormStates.new) {
          this.openSnackBar(
            'Invitado añadido correctamente',
            'Ok',
            'bg-success'
          );
          this.consultoraForm.reset();
          this.initForms();
        } else if (this.stateForm == FormStates.edit) {
          this.openSnackBar(
            'Invitado Editado correctamente',
            'Ok',
            'bg-success'
          );
          this.router.navigate(['home']);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.openSnackBar(
        'Oops... Comprueba los datos del formulario',
        'Ok',
        'bg-danger'
      );
    }
  }

  async saveCliente(){
    if (this.clienteForm.valid) {
      try {
        const cliente: Cliente = this.clienteForm.value;
        cliente.id = this.clienteEdit?.id || null;  // Para saber si es edicion o es nuevo registro

        if (this.stateForm == FormStates.new)
        cliente.fechaCreacion = Timestamp.fromDate(new Date());
        else cliente.fechaCreacion = this.clienteEdit.fechaCreacion;

        await this._clienteService.createCliente(cliente);

        if (this.stateForm == FormStates.new) {
          this.openSnackBar(
            'Invitado añadido correctamente',
            'Ok',
            'bg-success'
          );
          this.consultoraForm.reset();
          this.initForms();
        } else if (this.stateForm == FormStates.edit) {
          this.openSnackBar(
            'Invitado Editado correctamente',
            'Ok',
            'bg-success'
          );
          this.router.navigate(['home']);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      this.openSnackBar(
        'Oops... Comprueba los datos del formulario',
        'Ok',
        'bg-danger'
      );
    }
  }

  markConsultanAsTouched(){
    this.consultoraForm.controls['reclutador'].markAsTouched();
    this.consultoraForm.controls['empresa'].markAsTouched();
    this.consultoraForm.controls['email'].markAsTouched();
    this.consultoraForm.controls['fechaContacto'].markAsTouched();
    this.consultoraForm.controls['fechaModificacion'].markAsTouched();
    this.consultoraForm.controls['fechaCreacion'].markAsTouched();
    this.consultoraForm.controls['ubicacion'].markAsTouched();
    this.consultoraForm.controls['telefono'].markAsTouched();
    this.consultoraForm.controls['observaciones'].markAsTouched();
  }

  getState(): number {
    return this.consultoraEdit && typeof (this.consultoraEdit !== undefined) ? 2 : 1;
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type],
    });
  }
}
