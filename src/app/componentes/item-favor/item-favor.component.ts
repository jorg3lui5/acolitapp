import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FavorDTO } from '../../modelo/dto/favor-dto';
import { TipoPagoEnum } from '../../modelo/enum/tipo-pago-enum';
import { Router } from '@angular/router';
import { EstadofavorEnum } from '../../modelo/enum/estado-favor-enum';
import { ActionSheetController, AlertController, IonList } from '@ionic/angular';
import { StorageService } from 'src/app/servicios/librerias/storage.service';
import { Constantes } from '../../compartido/constantes';
import { TipoFavorEnum } from '../../modelo/enum/tipo-favor-enum';

@Component({
  selector: 'app-item-favor',
  templateUrl: './item-favor.component.html',
  styleUrls: ['./item-favor.component.scss'],
})
export class ItemFavorComponent implements OnInit {
  @ViewChild(IonList) ionList: IonList;

  @Input() favor: FavorDTO;
  @Input() tipoFavor: string;
  tipoPagoEnum = TipoPagoEnum;
  estadofavorEnum = EstadofavorEnum;
  estadosFavor: string[]=[];
  constantes: Constantes = new Constantes;
  usuario: string;

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private _storageService:StorageService,
    private alertController: AlertController,

  ) { }

  ngOnInit() {
    for(let estadoFavor in EstadofavorEnum){
      this.estadosFavor.push(EstadofavorEnum[estadoFavor]);
    }
    this.recuperarUsuario();
  }

  mostrarOpciones(){
    let opciones: any[] = [{
      text: 'Visualizar',
      icon: 'eye-outline',
      handler: () => {
        this.visualizar();
      }
    }];
    if(this.tipoFavor==TipoFavorEnum.solicitado){
      opciones.push({
        text: 'Editar',
        icon: 'create-outline',
        handler: () => {
          this.editar();
        }
      })
    }
    this.pesentarOpciones(opciones);
  }

  abrirFavor(){
    this.visualizar();
  }

  async pesentarOpciones(opciones: any[]) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Favor',
      buttons: opciones
    });
    await actionSheet.present();
  }

  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          this.establecerTipoFavor();
        }
      }
    )
    .catch(err=>{
      console.log("error: ",err);
    });
  }

  establecerTipoFavor(){
    if(this.favor.usuarioSolicita){
      if(this.usuario==(this.favor.usuarioSolicita as any) || (this.favor.usuarioSolicita.usuario && this.usuario==this.favor.usuarioSolicita.usuario)){
        this.tipoFavor=TipoFavorEnum.solicitado;
      }
    }

    if(this.favor.usuarioRealiza){
      if(this.usuario==(this.favor.usuarioRealiza as any) || (this.favor.usuarioRealiza.usuario && this.usuario==this.favor.usuarioRealiza.usuario)){
        this.tipoFavor=TipoFavorEnum.realizado;
      }
    }
  }

  visualizar(){
    this.ionList.closeSlidingItems(); 
    this.router.navigate(['/favor-recibido', this.favor.id]);
  }

  editar(){
    this.ionList.closeSlidingItems();
    this.router.navigate(['/solicitud', this.favor.id]);

  }

  verInformacionPersonal(usuario:any){
    if(usuario.usuario){
      this.router.navigate(['/informacion-personal', usuario.usuario]);
    }
    else{
      this.router.navigate(['/informacion-personal', usuario]);
    }
  }

  async verDescripcionPago(){
      const alert = await this.alertController.create({
        header: 'Pago: '+this.favor.tipoPago,
        //subHeader: mensajeAdvertenciaDTO.subtitulo,
        message: this.favor.descripcionPago,
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
          }
        ]
      });
      await alert.present();
  }
}
