import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OpcionesMenuService {

  constructor(
    private http: HttpClient,
    
  ) { }

  getOpcionesMenu() {
    return this.http.get<Componente[]>('/assets/datos/opciones-menu.json');
  }
}
