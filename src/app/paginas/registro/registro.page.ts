import { Component, OnInit } from '@angular/core';
import { Constantes } from '../..//compartido/constantes';
import { DatosPersonalesPage } from '../datos-personales/datos-personales.page';
import { NavController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Persona } from '../../modelo/persona';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../servicios/librerias/storage.service';
import { User } from '../../interfaces/firebase/User';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constantes: Constantes = new Constantes;

  usuario: Usuario;

  expresionMail: RegExp = new RegExp(this.constantes._expresionMail);
  formularioRegistro: FormGroup = this.formBuilder.group({
    identificacion: ['', ],
    correo: ['', Validators.compose([Validators.required, Validators.pattern(this.expresionMail)])],
    contrasenia: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    contraseniaConfirmada: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensajesError = {
    identificacion: [
      {tipo: 'required', mensaje: 'La identificación es requerida'},
    ],
    correo: [
      {tipo: 'required', mensaje: 'El correo es requerido'},
      {tipo: 'pattern', mensaje: 'Por favor ingrese un email válido'},
    ],
    contrasenia: [
      {tipo: 'required', mensaje: 'La contraseña es requerida'},
      {tipo: 'minlength', mensaje: 'La contraseña debe tener mínimo 6 caracteres'},
    ],
    contraseniaConfirmada: [
      {tipo: 'required', mensaje: 'Confirme la contraseña'},
      {tipo: 'minlength', mensaje: 'La contraseña debe tener mínimo 6 caracteres'},
    ],
  }

  get correo() {
    return this.formularioRegistro.get('correo');
  }

  get identificacion() {
    return this.formularioRegistro.get('identificacion');
  }

  get contrasenia() {
    return this.formularioRegistro.get('contrasenia');
  }

  get contraseniaConfirmada() {
    return this.formularioRegistro.get('contraseniaConfirmada');
  }
  
  constructor(
    private router: Router,
    public _usuarioService: UsuarioService,
    public toastController: ToastController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _storageService:StorageService,
    ) 
  {
      
  }

  ngOnInit() {
  }

  registrar() {
    console.log('aaaaaa');
    if(this.formularioRegistro.valid){
      if(this.formularioRegistro.value.contrasenia==this.formularioRegistro.value.contraseniaConfirmada){
        console.log('bbbbbbb');
        this.usuario=new Usuario();
        this.usuario.contrasenia=this.formularioRegistro.value.contrasenia;
        this.usuario.usuario=this.formularioRegistro.value.correo;
        this.usuario.correo=this.formularioRegistro.value.correo;
        //this.usuario.persona=new Persona();
        //this.usuario.persona.identificacion=this.formularioRegistro.value.identificacion;
        
        this._usuarioService.registrar(this.usuario.usuario,this.usuario.contrasenia)
        .then((data:User)=>{
          console.log('cccccc');

          this._usuarioService.crear(this.usuario)
          .then((data)=>{
            console.log('ddddddd');
            console.log(data);
            this._storageService.guardar(this.constantes._usuario,this.usuario.usuario);
            this.router.navigate(['/datos-personales']);
          })
          .catch(err=>{
              console.log("error: "+err);
              this.mostrarMensaje(err.message);
          });
        })
        .catch(err=>{
          if(err.code=='auth/email-already-in-use'){
            this.mostrarMensaje("Ya existe un usuario registrado con este correo");
          }
          else {
            console.log("error: "+err);
            this.mostrarMensaje(err.message);
          }
        });
      }
      else{
        this.mostrarMensaje("Las contraseñas no coinciden");
      }
    }
    else{
      this.mostrarMensaje("Por favor llene los campos requeridos");
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }
  
}
