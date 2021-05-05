import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaDTO } from 'src/app/modelo/dto/RespuestaDTO';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { auth } from 'firebase/app';

import { User } from '../interfaces/firebase/User';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  urlBase: string =environment.urlBase;
  servicio: string= "usuario/";
  coleccion: string = "usuarios";
  public user$: Observable<User>;
  
  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {

  }

  // crear(objeto): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'crear';
  //   return this.http.post<RespuestaDTO>(apiURL,objeto)
  // }

  crear(objeto) {

      // return this.angularFirestore
      // .collection(this.coleccion)
      // .doc(objeto.id)
      // .set({... objeto});

      return this.angularFirestore
        .collection(this.coleccion)
        .add({...objeto})

  }

  // actualizar(objeto): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'actualizar';
  //   return this.http.post<RespuestaDTO>(apiURL,objeto)
  // }

  actualizar(objeto) {
    // return this.angularFirestore
    // .collection(this.coleccion)
    // .doc(objeto.id)
    // .update(objeto);

    return this.angularFirestore
      .collection(this.coleccion)
      .doc(objeto.id)
      .update(objeto);


  }

  // eliminar(id): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'eliminar/'+id;
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  eliminar(id) {
    return this.angularFirestore
      .collection(this.coleccion)
      .doc(id)
      .delete();
  }

  // listarTodos(): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'listarTodos'
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  listarTodos() { 
    // return this.angularFirestore
    // .collection(this.coleccion)
    // .valueChanges();

    return this.angularFirestore
    .collection(this.coleccion)
    .snapshotChanges();
  }

  // recuperarPorId(id): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'recuperarPorId/'+id
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  recuperarPorId(id) {
    return this.angularFirestore
    .collection(this.coleccion)
    .doc(id)
    .valueChanges()
  }

  // recuperarPorUsuario(usuario): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'recuperarPorUsuario/'+usuario
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  recuperarPorUsuario(usuario) {
    return this.angularFirestore
    .collection(this.coleccion,(objeto) => objeto.where('usuario', '==', usuario))
    .snapshotChanges();
  }

  // loguear(usuario,contrasenia): Observable<RespuestaDTO> {
  //   let apiURL = this.urlBase+this.servicio+'loguear/'+usuario+"/"+contrasenia;
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  async loguear(usuario:string, contrasenia:string): Promise<User> {
    console.log(usuario, contrasenia);
      const { user } = await this.angularFireAuth.signInWithEmailAndPassword(usuario, contrasenia);
      return user;
  }

  async desloguear(): Promise<void> {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      return error;
    }
  }

  async registrar(email:string, password:string): Promise<User> {
    const { user } = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    //await this.enviarVerificacionEmail();
    return user;
  }
}
