import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { StorageService } from '../servicios/librerias/storage.service';
import { Constantes } from '../compartido/constantes';

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

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
            if(this._router.url=='/'){
              this._router.navigate(['/favores']);
            }
            return false;
          }
          else{
            return true;
          }
        }
      ));
      
      // return this._storageService.guardar(this.constantes._usuario,'ddd').then((dato) => {
      //   if(dato){
      //     if(this._router.url=='/'){
      //       this._router.navigate(['/favores']);
      //     }
      //     return false;
      //   }
      //   else{
      //     return true;
      //   }
      // })
      // .catch(err=>{
      //   console.log("error: "+err);
      //   return true;
      // });
  }
  
}
