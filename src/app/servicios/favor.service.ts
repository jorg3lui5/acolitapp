import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaDTO } from 'src/app/modelo/dto/RespuestaDTO';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavorService {
  
  urlBase: string =environment.urlBase;
  servicio: string= "favor/";
  coleccion: string = "favores";

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

  actualizar(objeto, id) {
    return this.angularFirestore
      .collection(this.coleccion)
      .doc(id)
      .update({...objeto});
  }

  eliminar(id) {
    console.log('dss');
    console.log('id');
    return this.angularFirestore
      .collection(this.coleccion)
      .doc(id)
      .delete();
  }

  listarTodos() { 
    return this.angularFirestore
    .collection(this.coleccion,(objeto) => objeto.orderBy('fechaSolicita','desc')) 
    .snapshotChanges();
  }
    
  recuperarPorId(id) {
    return this.angularFirestore
    .collection(this.coleccion)
    .doc(id)
    .valueChanges()
  }

  recuperarPorUsuarioSolicita(usuarioSolicita) {
    return this.angularFirestore
    .collection(this.coleccion,(objeto) => objeto.where('usuarioSolicita', '==', usuarioSolicita).orderBy('fechaSolicita','desc'))
    .snapshotChanges();
  }
  recuperarPorUsuarioRealiza(usuarioRealiza) {
    return this.angularFirestore
    .collection(this.coleccion,(objeto) => objeto.where('usuarioRealiza', '==', usuarioRealiza).orderBy('fechaSolicita','desc'))
    .snapshotChanges();
  }
}
