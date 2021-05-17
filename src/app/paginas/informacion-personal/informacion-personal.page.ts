import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Persona } from '../../modelo/persona';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { PersonaService } from '../../servicios/persona.service';

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
  constructor(
    private activatedRoute:ActivatedRoute,
    public _personaService: PersonaService,
    private router: Router,

  ) { }
  usuario:string;

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
      })
      .catch(error=> {
      });

    },
    (error)=>{
      console.log(error);
    }
    ); 
  }

  verFoto(){

  }
}
