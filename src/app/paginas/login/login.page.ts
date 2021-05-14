import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Router } from '@angular/router';
import { EnvioNotificacionService } from '../../servicios/envio-notificacion.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../modelo/usuario';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
//import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../servicios/librerias/storage.service';
import { User } from '../../interfaces/firebase/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constantes: Constantes = new Constantes;

  expresionMail: RegExp = new RegExp(this.constantes._expresionMail);
  formularioLogin: FormGroup = this.formBuilder.group({
    correo: ['', Validators.compose([Validators.required, Validators.pattern(this.expresionMail)])],
    contrasenia: ['', Validators.required],
  });

  mensajesError = {
    correo: [
      {tipo: 'required', mensaje: 'El correo es requerido'},
      {tipo: 'pattern', mensaje: 'Por favor ingrese un email válido'},
      // {tipo: 'maxlength', mensaje: 'El nombre debe ser mas largo de 1000'},
      
    ],
    contrasenia: [
      {tipo: 'required', mensaje: 'La contraseña es requerida'},
    ],
  }

  get correo() {
    return this.formularioLogin.get('correo');
  }

  get contrasenia() {
    return this.formularioLogin.get('contrasenia');
  }

  constructor(
    private router: Router,
    private _usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private _storageService:StorageService,
  ) { 
    //this.price = this.activatedRoute.snapshot.params['price'];
  }

  ngOnInit() {
  }

  loguear() {
    if(this.formularioLogin.valid){
      console.log('recuperi1',this.formularioLogin.value.correo);
      this._usuarioService.loguear(this.formularioLogin.value.correo,this.formularioLogin.value.contrasenia)
      .then((data:User)=>{
        console.log('recuperi',data);
        this._storageService.guardar(this.constantes._usuario,data.email).then(
          (data:string)=>{
            this.router.navigate(['/favores']);
          }
        )
        .catch(err=>{
            console.log("error: "+err);
        });
      })
      .catch(err=>{
        if(err.code=='auth/wrong-password'){
          this.mostrarMensaje('Ingrese la contraseña correcta.');
        }
        else if(err.code=='auth/user-not-found'){
          this.mostrarMensaje('No se encontró el correo. Intente nuevamente.');
        }
        else {
          console.log("error: "+err);
          this.mostrarMensaje(err);
        }
      });
      
      // this._usuarioService.loguear(usuario, contrasenia).subscribe(
      //   (data)=> {
      //     if(data && data.status=="OK"){
      //       if(data.objeto){
      //         //this.storage.set('usuario', usuario);
      //         this.route.navigate(['/favores']);
      //       }
      //       else{
      //         this.mostrarMensaje(data.message);
      //       }
      //     }
      //     else{
      //       this.mostrarMensaje(data.message);
      //     }
      //   },
      //   (error)=>{
      //     console.log(error);
      //   }
      // )
    }
    else{
      this.mostrarMensaje("El email y contraseña no son correctos");
    }
  }

  abrirRegistro() {
    this.router.navigate(['/registro']);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  // cambiarRequerido(){
  //   if(this.formularioLogin.valid){

  //   }
  //   if(this.formularioLogin.value.usuario=='aaa'){
  //     this.formularioLogin.get('contrasenia').setValidators([Validators.required]);
  //     this.formularioLogin.get('contrasenia').updateValueAndValidity();
  //   }
  //   else{
  //     this.formularioLogin.get('contrasenia').clearValidators();
  //     this.formularioLogin.get('contrasenia').updateValueAndValidity();
  //   }
  // }

  // refrescar(){
  //   this.formularioLogin.patchValue({
  //     usuario: '',
  //     contrasenia: '',
  //   });
  // }
}
