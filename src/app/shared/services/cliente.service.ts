import { Cliente } from './../models/Cliente';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCollection: any

  constructor(private angularfirestore: AngularFirestore) {
    this.clienteCollection = this.angularfirestore.collection("Cliente")
  }


  getCliente(){
    var t = this.angularfirestore
      .collection("Cliente")
      .snapshotChanges();

      return t
  }

  getClienteById(id: string){
    return this.clienteCollection
      .doc(id)
      .valueChanges();
  }

  createCliente(cliente: Cliente){
    return new Promise<any>((resolve, reject) => {
      this.clienteCollection
        .add(cliente)
        .then((response) => {
          console.log(response);
        },
        (error) => {
          reject(error);
        })
    })
  }

  updateCliente(cliente: Cliente, id: string){
    return this.clienteCollection
      .doc(id)
      .update(cliente);
  }

  deleteCliente(cliente: Cliente){
    return this.clienteCollection
      .doc(cliente.id)
      .delete()
  }
}
