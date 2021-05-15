import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { FavorDTO } from '../../modelo/dto/favor-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FavorService } from '../../servicios/favor.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { PersonaService } from '../../servicios/persona.service';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { StorageService } from '../../servicios/librerias/storage.service';
import { TipoPagoEnum } from 'src/app/modelo/enum/tipo-pago-enum';
import { Usuario } from '../../modelo/usuario';
import { Persona } from '../../modelo/persona';
import { TipoFavorEnum } from '../../modelo/enum/tipo-favor-enum';
import { EstadofavorEnum } from '../../modelo/enum/estado-favor-enum';
import { AccionFavorEnum } from '../../modelo/enum/accion-favor-enum';
import { MensajeAdvertenciaDTO } from '../../modelo/dto/mensaje-advertencia-dto';
import { CalificacionComponent } from '../../componentes/calificacion/calificacion.component';

@Component({
  selector: 'app-favor-recibido',
  templateUrl: './favor-recibido.page.html',
  styleUrls: ['./favor-recibido.page.scss'],
})
export class FavorRecibidoPage implements OnInit {
  loading: HTMLIonLoadingElement;
  constantes: Constantes = new Constantes;
  favor: FavorDTO;
  idFavor:string;
  usuario: string;
  tipoFavor: string;
  tipoPagoEnum = TipoPagoEnum;
  tipoFavorEnum = TipoFavorEnum;
  estadofavorEnum = EstadofavorEnum;
  accionFavorEnum = AccionFavorEnum;


  constructor(
    private activatedRoute:ActivatedRoute,
    public _favorService: FavorService,
    public _usuarioService: UsuarioService,
    public _personaService: PersonaService,
    public toastController: ToastController,
    private _storageService:StorageService,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    public popoverController: PopoverController,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.mostrarLoading(this.constantes._cargandoDatos);
    this.idFavor=this.activatedRoute.snapshot.paramMap.get('idFavor');
    console.log(this.idFavor);
    this.recuperarUsuario();
  }

  recuperarFavor(){
    this._favorService.recuperarPorId(this.idFavor).subscribe(res => {
      this.favor= {...<any>res};
      if(this.favor.usuarioSolicita){
        this._usuarioService.recuperarPorUsuario(this.favor.usuarioSolicita).subscribe(res => {
          let usuarios=[];
          res.forEach((doc) => {
            usuarios.push({
              id: doc.id,
              ...<any>doc.data()
            } as Usuario);
          });
          this._personaService.recuperarPorUsuario(this.favor.usuarioSolicita).subscribe(res => {
            let personas=[];
            res.forEach((doc) => {
              personas.push( {
                id: doc.id,
                ...<any>doc.data()
              } as Persona);
            });
            this.favor.usuarioSolicita=usuarios[0];
            this.favor.usuarioSolicita.persona=personas[0];

            if(this.usuario==this.favor.usuarioSolicita.usuario){
              this.tipoFavor=TipoFavorEnum.solicitado;
            }
            if(this.favor.usuarioRealiza){
              this._usuarioService.recuperarPorUsuario(this.favor.usuarioRealiza).subscribe(res => {
                let usuarios=[];
                res.forEach((doc) => {
                  usuarios.push({
                    id: doc.id,
                    ...<any>doc.data()
                  } as Usuario);
                });
                this._personaService.recuperarPorUsuario(this.favor.usuarioRealiza).subscribe(res => {
                  let personas=[];
                  res.forEach((doc) => {
                    personas.push( {
                      id: doc.id,
                      ...<any>doc.data()
                    } as Persona);
                  });
                  this.favor.usuarioRealiza=usuarios[0];
                  this.favor.usuarioRealiza.persona=personas[0];
      
                  if(this.usuario==this.favor.usuarioRealiza.usuario){
                    this.tipoFavor=TipoFavorEnum.realizado;
                  }
                  this.ocultarLoading();
                },
                (error)=>{
                  this.ocultarLoading();
                  console.log(error);
                }
                ); 
              },
              (error)=>{
                this.ocultarLoading();
                console.log(error);
              }
              ); 
            }else{
              this.ocultarLoading();
            }
          },
          (error)=>{
            this.ocultarLoading();
            console.log(error);
          }
          ); 
        },
        (error)=>{
          this.ocultarLoading();
          console.log(error);
        }
        ); 
      }
      else{
          this.ocultarLoading();
      }
    },
    (error)=>{
      this.ocultarLoading();
      console.log(error);
    }
    ); 
  }

  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          this.recuperarFavor();
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

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  eliminarFavor(mensaje: string, paginaRetorna:string){
    this._favorService.eliminar(this.idFavor)
    .then((data)=> {
      this.mostrarMensaje(mensaje);
      if(paginaRetorna){
        this.router.navigate(['/'+paginaRetorna]);
      }
    })
    .catch(err=>{
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
  }

  actualizarFavor(mensaje: string, paginaRetorna:string){
    this._favorService.actualizar(this.favor,this.idFavor)
    .then((data)=> {
      this.mostrarMensaje(mensaje);
      if(paginaRetorna){
        this.router.navigate(['/'+paginaRetorna]);
      }
    })
    .catch(err=>{
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
  }

  cancelaSolicitante(){
    this.eliminarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.cancelaSolicitante),'favores');
  }
  aceptaSolicitante(){
    this.favor.estado=EstadofavorEnum.realizando;
    this.cambiarUsuarioDTOtoString();
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.aceptaAyudante),null);
  }
  rechazaSolicitante(){
    this.favor.estado=EstadofavorEnum.solicitado;
    this.cambiarUsuarioDTOtoString();
    this.favor.usuarioRealiza=null;
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.rechazaSolicitante),null);
  }
  finalizaSolicitante(calificacion:number){
    this.favor.estado=EstadofavorEnum.finalizado;
    this.favor.calificacionSolicita=calificacion;
    this.cambiarUsuarioDTOtoString();
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.finalizaSolicitante),null);
  }
  calificaSolicitante(calificacion:number){
    this.favor.estado=EstadofavorEnum.calificado;
    this.favor.calificacionSolicita=calificacion;
    this.cambiarUsuarioDTOtoString();
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.calificaSolicitante),null);
  }
  aceptaAyudante(){
    this.favor.estado=EstadofavorEnum.aceptado;
    this.cambiarUsuarioDTOtoString();
    this.favor.usuarioRealiza=(this.usuario) as any;
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.aceptaAyudante),null);
  }
  cancelaAyudante(){
    this.favor.estado=EstadofavorEnum.solicitado;
    this.cambiarUsuarioDTOtoString();
    this.favor.usuarioRealiza=null;
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.cancelaAyudante),'favores');
  }
  finalizaAyudante(calificacion:number){
    this.favor.estado=EstadofavorEnum.finalizado;
    this.favor.calificacionRealiza=calificacion;
    this.cambiarUsuarioDTOtoString();
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.finalizaAyudante),null);
  }
  calificaAyudante(calificacion:number){
    this.favor.estado=EstadofavorEnum.calificado;
    this.favor.calificacionRealiza=calificacion;
    this.cambiarUsuarioDTOtoString();
    this.actualizarFavor(this.devolverMensajeFinAccion(AccionFavorEnum.calificaAyudante),null);
  }

  async mostrarModal(accion:string,mensaje:string){
    const modal = await this.modalController.create({
      component: CalificacionComponent,
      cssClass: 'dialog-modal',
      componentProps: {
        'mensaje': mensaje,
      }
    });
    await modal.present();

    //const {data}= await modal.onDidDismiss();
    
    const {data}= await modal.onWillDismiss();
    if(data){
      this.ejecutarAccion(accion,data.calificacion);
    }
  }

  async realizarAccion(accion:string) {
    console.log(accion);
    if(accion==AccionFavorEnum.finalizaAyudante || accion==AccionFavorEnum.calificaAyudante){
      await this.mostrarModal(accion,'Califica al usuario que solicitó el favor, otorgándole de 1 a 5 estrellas.');
      return null;
      // if(this.favor.calificacionRealiza==0){
      //   this.mostrarMensaje("Debe calificar a la persona que solicitó el favor");
      //   return null;
      // }

    }
    else if(accion==AccionFavorEnum.finalizaSolicitante || accion==AccionFavorEnum.calificaSolicitante){
      await this.mostrarModal(accion,'Califica al usuario que te ayudó con el favor, otorgándole de 1 a 5 estrellas.');
      return null;
      // if(this.favor.calificacionSolicita==0){
      //   this.mostrarMensaje("Debe calificar a la persona que le ayudó con el favor");
      //   return null;
      // }
    }
    let mensajeAdvertenciaDTO:MensajeAdvertenciaDTO= this.devolverMensajeAdvertencia(accion);
    await this.confirmarAccion(accion, mensajeAdvertenciaDTO);
  }

  async confirmarAccion(accion:string,mensajeAdvertenciaDTO: MensajeAdvertenciaDTO){
    const alert = await this.alertController.create({
      header: mensajeAdvertenciaDTO.titulo,
      //subHeader: mensajeAdvertenciaDTO.subtitulo,
      message: mensajeAdvertenciaDTO.mensaje,
      buttons: [
        {
          text: mensajeAdvertenciaDTO.botonAceptar,
          handler: () => {
            this.ejecutarAccion(accion);
          }
        },
        {
          text: mensajeAdvertenciaDTO.botonCancelar,
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  cambiarUsuarioDTOtoString(){
    if(this.favor.usuarioRealiza && this.favor.usuarioRealiza.usuario){
      this.favor.usuarioRealiza=(this.favor.usuarioRealiza.usuario) as any;
    }
    if(this.favor.usuarioSolicita && this.favor.usuarioSolicita.usuario){
      this.favor.usuarioSolicita=(this.favor.usuarioSolicita.usuario) as any;
    }
  }

  devolverMensajeAdvertencia(accion:string){
    switch(accion) {
      case AccionFavorEnum.cancelaSolicitante: 
        return new MensajeAdvertenciaDTO('Cancelar Favor','Cancelar Favor','Se va a ELIMINAR el favor solicitado. ¿Está seguro de elimarlo?','Si, eliminar','No');
      case AccionFavorEnum.aceptaSolicitante: 
        return new MensajeAdvertenciaDTO('Aceptar Ayuda','Aceptar Ayuda','¿Está seguro de ACEPTAR la ayuda de ' +this.favor.usuarioRealiza.persona.nombresApellidos+'?','Si, aceptar','Cancelar');
      case AccionFavorEnum.rechazaSolicitante: 
        return new MensajeAdvertenciaDTO('Rechazar Ayuda','Rechazar Ayuda','¿Está seguro de RECHAZAR la ayuda de ' +this.favor.usuarioRealiza.persona.nombresApellidos+'?','Si, rechazar','Cancelar');
      case AccionFavorEnum.finalizaSolicitante: 
        return new MensajeAdvertenciaDTO('Finalizar Favor','Finalizar Favor','Usted CALIFICARÁ con '+this.favor.calificacionSolicita+ ' estrellas al usuario que le ayudó con el favor.','Aceptar','Cancelar');
      case AccionFavorEnum.calificaSolicitante: 
        return new MensajeAdvertenciaDTO('Calificar Favor','Calificar Favor','Usted CALIFICARÁ con '+this.favor.calificacionSolicita+ ' estrellas al usuario que le ayudó con el favor.','Aceptar','Cancelar');
      case AccionFavorEnum.aceptaAyudante: 
        return new MensajeAdvertenciaDTO('Ayudar Favor','Ayudar Favor','Usted deberá REALIZAR el favor solicitado. ¿Está seguro de ayudar?','Si, ayudar','No');
      case AccionFavorEnum.cancelaAyudante: 
        return new MensajeAdvertenciaDTO('Cancelar Favor','Cancelar Favor','¿Está seguro de CANCELAR su ayuda en el favor solicitado?','Si, cancelar','No');
      case AccionFavorEnum.finalizaAyudante: 
        return new MensajeAdvertenciaDTO('Finalizar Ayuda','Finalizar Ayuda','Usted CALIFICARÁ con '+this.favor.calificacionRealiza+ ' estrellas al usuario que solicitó el favor.','Aceptar','Cancelar');
      case AccionFavorEnum.calificaAyudante: 
        return new MensajeAdvertenciaDTO('Finalizar Favor','Finalizar Favor','Usted CALIFICARÁ con '+this.favor.calificacionRealiza+ ' estrellas al usuario que solicitó el favor.','Aceptar','Cancelar');
      default: { 
        return null;
      } 
    }
  }

  ejecutarAccion(accion:string, calificacion?:number){
    switch(accion) {
      case AccionFavorEnum.cancelaSolicitante: 
        return this.cancelaSolicitante();
      case AccionFavorEnum.aceptaSolicitante: 
        return this.aceptaSolicitante();
      case AccionFavorEnum.rechazaSolicitante: 
        return this.rechazaSolicitante();
      case AccionFavorEnum.finalizaSolicitante: 
        return this.finalizaSolicitante(calificacion);
      case AccionFavorEnum.calificaSolicitante: 
        return this.calificaSolicitante(calificacion);
      case AccionFavorEnum.aceptaAyudante: 
        return this.aceptaAyudante();
      case AccionFavorEnum.cancelaAyudante: 
        return this.cancelaAyudante();
      case AccionFavorEnum.finalizaAyudante: 
        return this.finalizaAyudante(calificacion);
      case AccionFavorEnum.calificaAyudante: 
        return this.calificaAyudante(calificacion);
      default: { 
        return null;
      } 
    }
  }

  devolverMensajeFinAccion(accion:string){
    switch(accion) {
      case AccionFavorEnum.cancelaSolicitante: 
        return "Favor eliminado satisfactoriamente";
      case AccionFavorEnum.aceptaSolicitante: 
        return "Favor aceptado satisfactoriamente";
      case AccionFavorEnum.rechazaSolicitante: 
        return "Favor rechazado satisfactoriamente";
      case AccionFavorEnum.finalizaSolicitante: 
        return "Favor finalizado satisfactoriamente";
      case AccionFavorEnum.calificaSolicitante: 
        return "Favor calificado satisfactoriamente";
      case AccionFavorEnum.aceptaAyudante: 
        return "Favor aceptado satisfactoriamente";
      case AccionFavorEnum.cancelaAyudante: 
        return "Ayuda cancelado satisfactoriamente";
      case AccionFavorEnum.finalizaAyudante: 
        return "Favor finalizado satisfactoriamente";
      case AccionFavorEnum.calificaAyudante: 
        return "Favor calificado satisfactoriamente";
      default: { 
        return null;
      } 
    }
  }

  async mostrarLoading(message: string) {
    this.loading = await this.loadingController.create({
      message:message,
      showBackdrop: true,
      cssClass: 'loadingPersonalizado',
    });
    await this.loading.present();
    console.log('despues ml',this.loading);
  }

  ocultarLoading(){
    this.loading.dismiss();

  }
}
