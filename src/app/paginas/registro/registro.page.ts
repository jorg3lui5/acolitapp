import { Component, OnInit } from '@angular/core';
import { Constantes } from '../..//compartido/constantes';
import { DatosPersonalesPage } from '../datos-personales/datos-personales.page';
import { ActionSheetController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Persona } from '../../modelo/persona';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../servicios/librerias/storage.service';
import { User } from '../../interfaces/firebase/User';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TipoFotoEnum } from '../../modelo/enum/tipo-foto-enum';
import firebase from 'firebase';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constantes: Constantes = new Constantes;
  loading: HTMLIonLoadingElement;

  usuario: Usuario;

  expresionMail: RegExp = new RegExp(this.constantes._expresionMail);
  formularioRegistro: FormGroup = this.formBuilder.group({
    foto: [null,Validators.required],
    identificacion: ['', ],
    correo: ['', Validators.compose([Validators.required, Validators.pattern(this.expresionMail)])],
    contrasenia: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    contraseniaConfirmada: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensajesError = {
    foto: [
      {tipo: 'required', mensaje: 'La foto del perfil es requerida'},
    ],
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

  get foto() {
    return this.formularioRegistro.get('foto');
  }
  
  constructor(
    private router: Router,
    public _usuarioService: UsuarioService,
    public toastController: ToastController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _storageService:StorageService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,

    ) 
  {
      
  }

  ngOnInit() {
  }

  async registrar() {
    await this.mostrarLoading(this.constantes._guardandoDatos);

    if(this.formularioRegistro.valid){
      if(this.formularioRegistro.value.contrasenia==this.formularioRegistro.value.contraseniaConfirmada){
        this.usuario=new Usuario();
        this.usuario.contrasenia=this.formularioRegistro.value.contrasenia;
        this.usuario.usuario=this.formularioRegistro.value.correo.toLowerCase().trim();
        this.usuario.correo=this.formularioRegistro.value.correo.toLowerCase().trim();
        //this.usuario.persona=new Persona();
        //this.usuario.persona.identificacion=this.formularioRegistro.value.identificacion;
        
        this._usuarioService.registrar(this.usuario.usuario,this.usuario.contrasenia)
        .then((data:User)=>{
          this._usuarioService.crear(this.usuario)
          .then((data)=>{
            this._storageService.guardar(this.constantes._usuario,this.usuario.usuario).then(
              (data:string)=>{
                // var file = '../../../assets/img/logo.png';
                // fetch(file)
                //   .then (res => res.blob()) // Gets the response and returns it as a blob
                //   .then (blob => {
                    let storageRef = firebase.storage().ref();
                    const imageRef = storageRef.child(`fotoPerfil/${this.usuario.usuario}.jpg`);
                    //imageRef.put(blob)
                    imageRef.putString(this.formularioRegistro.value.foto, firebase.storage.StringFormat.DATA_URL)
                      .then((snapshot)=> {
                        this.ocultarLoading();
                        this.router.navigate(['/datos-personales']);
                        // Do something here when the data is succesfully uploaded!
                      })
                      .catch(error=>{
                        this.ocultarLoading();
                        console.error(error);
                        this.mostrarMensaje(error.message);
                      });
                // });
              }
            )
            .catch(err=>{
                this.ocultarLoading();
                console.log("error: "+err);
                this.mostrarMensaje(err.message);
            });
          })
          .catch(err=>{
              this.ocultarLoading();
              console.log("error: "+err);
              this.mostrarMensaje(err.message);
          });
        })
        .catch(err=>{
          this.ocultarLoading();
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
        this.ocultarLoading();
        this.mostrarMensaje("Las contraseñas no coinciden");
      }
    }
    else{
      this.ocultarLoading();
      if(!this.formularioRegistro.value.foto){
        return this.mostrarMensaje("Por favor seleccione una foto de perfil.");
      }
      this.mostrarMensaje("Por favor llene los campos requeridos (*).");
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  abrirCamaraGaleria(opcionesCamara: CameraOptions){
    this.camera.getPicture(opcionesCamara).then((imageData) => {
      this.foto.setValue('data:image/jpeg;base64,' + imageData);
      this.foto.updateValueAndValidity();
      //this.subirFotoPerfilFirebase(this.formularioRegistro.value.foto,'lolita');
    })
    .catch(error=>{
      console.log(error);
    });
  }

  subirFoto(){
    this.seleccionarTipoFoto();
  }

  async seleccionarTipoFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto del perfil',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Galería',
          icon: 'image-outline',
          handler: () => {
            const opcionesCamara=this.obtenerOpcionesSubidaFoto(TipoFotoEnum.galeria);
            this.abrirCamaraGaleria(opcionesCamara);
          }
        }, {
          text: 'Cámara',
          icon: 'camera-outline',
          handler: () => {
            const opcionesCamara=this.obtenerOpcionesSubidaFoto(TipoFotoEnum.camara);
            this.abrirCamaraGaleria(opcionesCamara);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  obtenerOpcionesSubidaFoto(tipoFoto: string){
    const opcionesCamara: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
  
      sourceType: tipoFoto==TipoFotoEnum.camara?this.camera.PictureSourceType.CAMERA:this.camera.PictureSourceType.PHOTOLIBRARY,
      //allowEdit: false,
      // targetHeight: 1024,
      // targetWidth: 1024,
      // correctOrientation: true,
      // saveToPhotoAlbum: true,
      
    }
    return opcionesCamara;
  }

  async mostrarLoading(message: string) {
    this.loading = await this.loadingController.create({
      message:message,
      showBackdrop: true,
    });
    await this.loading.present();
  }

  ocultarLoading(){
    this.loading.dismiss();

  }
}
