import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
  ) 
  { 
    this.init();
  }

  async init() {
    console.log('estorag');
    const storage = await this.storage.create();    
    console.log('estorag');
    console.log(storage);
    this._storage = storage;
  }

  guardar(clave:string, valor:string): Promise<any>{
    return this._storage.set(clave, valor);
  }

  recuperar(clave:string): Promise<any>{
    console.log('eee3')
    console.log(this._storage);
    console.log('aaa');
    console.log(this._storage.get(clave));
    console.log('eee4');
    return this._storage.get(clave);
  }
}
