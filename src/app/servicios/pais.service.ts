import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaDTO } from 'src/app/modelo/dto/RespuestaDTO';
import { Observable } from 'rxjs';
import { PaisEnum } from '../modelo/enum/pais-enum';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  urlBase: string =environment.urlBase;
  servicio: string= "pais/";
  
  constructor(private http: HttpClient) {

  }

  crear(objeto): Observable<RespuestaDTO> {
    let apiURL = this.urlBase+this.servicio+'crear';
    return this.http.post<RespuestaDTO>(apiURL,objeto)
  }

  actualizar(objeto): Observable<RespuestaDTO> {
    let apiURL = this.urlBase+this.servicio+'actualizar';
    return this.http.post<RespuestaDTO>(apiURL,objeto)
  }

  eliminar(): Observable<RespuestaDTO> {
    let apiURL = this.urlBase+this.servicio+'eliminar';
    return this.http.get<RespuestaDTO>(apiURL)
  }

  // listarTodos(): Observable<RespuestaDTO> {

  //   let apiURL = this.urlBase+this.servicio+'listarTodos'
  //   return this.http.get<RespuestaDTO>(apiURL)
  // }

  listarTodos(): string[] {
    let objetos:string[]=[];
    for(let objeto in PaisEnum){
      objetos.push(PaisEnum[objeto] as string)
    }
    return objetos;
  }

  recuperarPorId(id): Observable<RespuestaDTO> {
    let apiURL = this.urlBase+this.servicio+'recuperarPorId/'+id
    return this.http.get<RespuestaDTO>(apiURL)
  }


}
