import { Consultora } from './../models/Consultora';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConsultoraService {

  consultoraCollection: any

  constructor(private angularfirestore: AngularFirestore) {
    this.consultoraCollection = this.angularfirestore.collection("Consultora")
  }

  getConsultoras(){
    var t = this.angularfirestore
      .collection("Consultora")
      .snapshotChanges();

      return t
  }

  getConsultoraById(id: string){
    return this.consultoraCollection
      .doc(id)
      .valueChanges();
  }

  createConsultora(calificacion: Consultora){
    return new Promise<any>((resolve, reject) => {
      this.consultoraCollection
        .add(calificacion)
        .then((response) => {
          console.log(response);
        },
        (error) => {
          reject(error);
        })
    })
  }

  updateConsultora(calificacion: Consultora, id: string){
    return this.consultoraCollection
      .doc(id)
      .update(calificacion);
  }

  deleteConsultora(calificacion: Consultora){
    return this.consultoraCollection
      .doc(calificacion.id)
      .delete()
  }
}
