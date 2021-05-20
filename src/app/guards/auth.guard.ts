import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../servicios/librerias/storage.service';
import { Constantes } from '../compartido/constantes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constantes: Constantes = new Constantes();

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _storageService:StorageService,
    )
  {

  }

  /* permite cargar ciertas rutas o pantallas cuando el usuario está logueado.*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._angularFireAuth.authState.pipe(
        map(auth => {
          if(auth){
            return true;
          }
          else{
            this._router.navigate(['/login']);
            return false;
          }
        }
      ));
  }
  
}
