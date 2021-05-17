import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Persona } from '../../modelo/persona';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { PersonaService } from '../../servicios/persona.service';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StorageService } from '../../servicios/librerias/storage.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.page.html',
  styleUrls: ['./informacion-personal.page.scss'],
})
export class InformacionPersonalPage implements OnInit {
  loading: HTMLIonLoadingElement;
  constantes: Constantes = new Constantes;
  persona: Persona;
  foto: any;
  storageRef = firebase.storage().ref();
  desabilitado: boolean = false;
  usuario:string;

  constructor(
    private activatedRoute:ActivatedRoute,
    public _personaService: PersonaService,
    private router: Router,
    private fullScreenImage: FullScreenImage,
    private photoViewer: PhotoViewer,
    private _storageService:StorageService,
    private loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.iniciar();
  } 

  async iniciar(){
    await this.mostrarLoading(this.constantes._cargandoDatos);
    this.usuario=this.activatedRoute.snapshot.paramMap.get('usuario');
    if(this.usuario){
      this.recuperarPersona(this.usuario);
    }
    else{
      this.recuperarUsuario();
    }
  }

  recuperarPersona(usuario:string){
    this._personaService.recuperarPorUsuario(usuario).subscribe(res => {
      let personas=[];
      res.forEach((doc) => {
        personas.push( {
          id: doc.id,
          ...<any>doc.data()
        } as Persona);
      });

      const imageRef = this.storageRef.child(`fotoPerfil/${usuario}.jpg`);

      imageRef.getDownloadURL().then(url=> {
        this.persona=personas[0];
        this.foto=url;
        this.ocultarLoading();
      })
      .catch(error=> {
        this.ocultarLoading();
        console.log(error);
      });

    },
    (error)=>{
      this.ocultarLoading();
      console.log(error);
    }
    ); 
  }

  verFoto(foto: any){
    let opciones = {
      share: true, // default is false
      closeButton: true, // default is true
      copyToReference: true, // default is false
      headers: 'NO se puede vissualizar',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
    }
    this.photoViewer.show(
      foto,
      'Foto de Perfil', 
      opciones
    );
  }

  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          this.recuperarPersona(this.usuario);
        }
        else{
          this.ocultarLoading();
          this.mostrarMensaje("No pudo recuperar el usuario");
        }
      }
    )
    .catch(err=>{
      this.ocultarLoading();
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
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

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }
}
