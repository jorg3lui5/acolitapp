import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { FavorService } from '../../servicios/favor.service';
import { StorageService } from '../../servicios/librerias/storage.service';
import { Favor } from '../../modelo/favor';
import { FavorDTO } from '../../modelo/dto/favor-dto';
import { UsuarioService } from '../../servicios/usuario.service';
import { PersonaService } from '../../servicios/persona.service';
import { Usuario } from '../../modelo/usuario';
import { Persona } from '../../modelo/persona';
import { _ParseAST } from '@angular/compiler';
import { TipoFavorEnum } from '../../modelo/enum/tipo-favor-enum';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Component({
  selector: 'app-favores-realizados',
  templateUrl: './favores-realizados.page.html',
  styleUrls: ['./favores-realizados.page.scss'],
})
export class FavoresRealizadosPage implements OnInit {
  favores: FavorDTO[]=[];
  constantes: Constantes = new Constantes;
  tipoFavor: string=TipoFavorEnum.realizado;
  usuario: string;
  storageRef = firebase.storage().ref();

  sliderOpts = {
    allowSlidePrev:false,
    allowSlideNext: false
  }

  constructor(
    public _favorService: FavorService,
    public _usuarioService: UsuarioService,
    public _personaService: PersonaService,
    public toastController: ToastController,
    private _storageService:StorageService,
  ) {

  }

  ngOnInit() {
    this.recuperarUsuario();
  }

  recuperarFavores(){
    this._favorService.recuperarPorUsuarioRealiza(this.usuario).subscribe(res => {
      this.favores = res.map( (e:any) => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as FavorDTO;
      });
      for(let favor of this.favores){
        if(favor.usuarioSolicita){
          this._usuarioService.recuperarPorUsuario(favor.usuarioSolicita).subscribe(res => {
            let usuarios=[];
            res.forEach((doc) => {
              usuarios.push({
                id: doc.id,
                ...<any>doc.data()
              } as Usuario);
            });
            this._personaService.recuperarPorUsuario(favor.usuarioSolicita).subscribe(res => {
              let personas=[];
              res.forEach((doc) => {
                personas.push( {
                  id: doc.id,
                  ...<any>doc.data()
                } as Persona);
              });
              favor.usuarioSolicita=usuarios[0];
              favor.usuarioSolicita.persona=personas[0];

              const imageRef = this.storageRef.child(`fotoPerfil/${favor.usuarioSolicita.usuario}.jpg`);
              imageRef.getDownloadURL().then(url=> {
                favor.usuarioSolicita.foto=url;
                if(favor.usuarioRealiza){
                  this._usuarioService.recuperarPorUsuario(favor.usuarioRealiza).subscribe(res => {
                    let usuarios=[];
                    res.forEach((doc) => {
                      usuarios.push({
                        id: doc.id,
                        ...<any>doc.data()
                      } as Usuario);
                    });
                    this._personaService.recuperarPorUsuario(favor.usuarioRealiza).subscribe(res => {
                      let personas=[];
                      res.forEach((doc) => {
                        personas.push( {
                          id: doc.id,
                          ...<any>doc.data()
                        } as Persona);
                      });
                      favor.usuarioRealiza=usuarios[0];
                      favor.usuarioRealiza.persona=personas[0];

                      const imageRef = this.storageRef.child(`fotoPerfil/${favor.usuarioRealiza.usuario}.jpg`);
                      imageRef.getDownloadURL().then(url=> {
                        favor.usuarioRealiza.foto=url;
                      })
                      .catch(error=> {
                        console.error('error');
                      });
                    }); 
                  }); 
                }
              })
              .catch(error=> {
                console.error('error');
              });
            }); 
          }); 
        }
      }
    });   
  }

  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          this.recuperarFavores();
        }
        else{
          this.mostrarMensaje("No pudo recuperar el usuario");
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
}
