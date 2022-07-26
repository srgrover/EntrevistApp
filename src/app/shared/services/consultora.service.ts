import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { Consultora } from './../models/Consultora';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConsultoraService {

  consultoraCollection: any

  constructor(private angularfirestore: AngularFirestore, private db: DbService, private auth: AuthService) {
    this.consultoraCollection = this.angularfirestore.collection("Consultora");
  }

  getConsultoras(){
    return this.db.get$('Consultora', ref => ref.where('usuario', '==', this.auth.getCurrentUser().uid))
  }

  getConsultoraById(id: string){
    return this.consultoraCollection
      .doc(id)
      .valueChanges();
  }

  createConsultora(consultora: Consultora): Promise<void>{
    return new Promise<any>((resolve, reject) => {
      try {
        consultora.id = consultora.id || this.angularfirestore.createId();
        const res = this.consultoraCollection
        .add(consultora)
        .then((response) => {
          console.log("RESPONSE: ",response);
        },
        (error) => {
          reject(error);
        });
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateConsultora(consultora: Consultora, id: string){
    return this.consultoraCollection
      .doc(id)
      .update(consultora);
  }

  deleteConsultora(consultora: Consultora){
    return this.consultoraCollection
      .doc(consultora.id)
      .delete()
  }
}
