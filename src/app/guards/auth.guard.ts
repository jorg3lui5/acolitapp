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

      // return this._storageService.guardar(this.constantes._usuario,"usu").then((dato) => {
      //   if(dato){
      //     return true;
      //   }
      //   else{
      //     this._router.navigate(['/login']);
      //     return false;
      //   }
      // })
      // .catch(err=>{
      //   console.log("error: "+err);
      //   this._router.navigate(['/login']);
      //   return false;
      // });
  }
  
}
