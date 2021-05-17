import { Component, NgZone, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { Constantes } from './compartido/constantes';
import { OpcionesMenuService } from './servicios/menu/opciones-menu.service';
import { UsuarioService } from './servicios/usuario.service';
import { StorageService } from './servicios/librerias/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { UsuarioDTO } from './modelo/dto/usuario-dto';
import { Persona } from './modelo/persona';
import { Usuario } from './modelo/usuario';
import { PersonaService } from './servicios/persona.service';
import firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  componentes: Observable<Componente[]>;
  constantes: Constantes = new Constantes;

  usuario: string;
  usuarioDTO: Usuario;
  storageRef = firebase.storage().ref();
  private _storage: Storage | null = null;

  constructor(
    private _opcionesMenuService: OpcionesMenuService,
    private _storageService:StorageService,
    private router: Router,
    public _usuarioService: UsuarioService,
    public _personaService: PersonaService,
    public toastController: ToastController,
    private storage: Storage,
    private photoViewer: PhotoViewer,
  ) { 
    router.events.subscribe((val) => {
        if(val instanceof NavigationEnd){
          this.iniciar();
        }
    });
  }

  ngOnInit() {
    this.iniciar();
  }

  iniciar(){
    this.recuperarUsuario();
    this.componentes=this._opcionesMenuService.getOpcionesMenu();
  }

  cerrarSesion(){
    this._usuarioService.desloguear()
    .then(()=>{
      this._storageService.guardar(this.constantes._usuario,'').then(
        (data:string)=>{
          this.router.navigate(['/login']);
        }
      )
      .catch(err=>{
          console.log("error: "+err);
      });
    })
    .catch(err=>{
        console.log("error: "+err);
        //this.mostrarMensaje(err);
    });
  }

  recuperarDatosUsuario(){
    this._usuarioService.recuperarPorUsuario(this.usuario).subscribe(res => {
      let usuarios=[];
      res.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          ...<any>doc.data()
        } as Usuario);
      });
      this._personaService.recuperarPorUsuario(this.usuario).subscribe(res => {
        let personas=[];
        res.forEach((doc) => {
          personas.push( {
            id: doc.id,
            ...<any>doc.data()
          } as Persona);
        });
        this.usuarioDTO=usuarios[0];
        this.usuarioDTO.persona=personas[0];
        const imageRef = this.storageRef.child(`fotoPerfil/${this.usuario}.jpg`);
        imageRef.getDownloadURL().then(url=> {
          this.usuarioDTO.foto=url;
        })
        .catch(error=> {
          console.error('error');
        });
      },
      (error)=>{
        console.log(error);
      }
      ); 
    },
    (error)=>{
      console.log(error);
    }
    ); 
  }

  async recuperarUsuario(){
    const storage = await this.storage.create();    
    this._storage = storage;
    this._storage.get(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          if(!this.usuarioDTO || !this.usuarioDTO.persona){
            this.recuperarDatosUsuario();
          }
        }
        else{
          this.usuarioDTO=null;
          //this.mostrarMensaje("No pudo recuperar el usuario");
        }
      }
    )
    .catch(err=>{
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  // verInformacionPersonal(usuario:any){
  //   if(usuario?.usuario){
  //     this.router.navigate(['/informacion-personal', usuario.usuario]);
  //   }
  //   else if(usuario){
  //     this.router.navigate(['/informacion-personal', usuario]);
  //   }
  // }

  verFoto(foto:any){
    if(foto){
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
  }
}