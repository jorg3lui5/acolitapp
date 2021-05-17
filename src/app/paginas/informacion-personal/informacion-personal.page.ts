import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Persona } from '../../modelo/persona';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { PersonaService } from '../../servicios/persona.service';
import { FullScreenImage } from '@ionic-native/full-screen-image/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.page.html',
  styleUrls: ['./informacion-personal.page.scss'],
})
export class InformacionPersonalPage implements OnInit {
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
  ) { }

  ngOnInit() {
    this.usuario=this.activatedRoute.snapshot.paramMap.get('usuario');
    if(this.usuario){
      this.recuperarPersona(this.usuario);
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
        console.log('foto');
        console.log(this.foto);
      })
      .catch(error=> {
      });

    },
    (error)=>{
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
}
