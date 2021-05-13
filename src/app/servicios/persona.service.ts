import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  urlBase: string =environment.urlBase;
  servicio: string= "persona/";
  coleccion: string = "personas";
  
  constructor(
    private http: HttpClient,
    private angularFirestore: AngularFirestore,
  ) {

  }

  crear(objeto) {
    return this.angularFirestore
      .collection(this.coleccion)
      .add({...objeto})
  }

  actualizar(objeto) {
    return this.angularFirestore
      .collection(this.coleccion)
      .doc(objeto.id)
      .update({...objeto});
  }

  eliminar(id) {
    return this.angularFirestore
      .collection(this.coleccion)
      .doc(id)
      .delete();
  }

  listarTodos() { 
    return this.angularFirestore
    .collection(this.coleccion)
    .snapshotChanges();
  }
    
  recuperarPorId(id) {
    return this.angularFirestore
    .collection(this.coleccion)
    .doc(id)
    .valueChanges()
  }

  recuperarPorUsuario(usuario) {
    return this.angularFirestore
    .collection(this.coleccion,(objeto) => objeto.where('usuario', '==', usuario))
    .get();
  }

}
