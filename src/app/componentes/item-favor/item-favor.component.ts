import { Component, Input, OnInit } from '@angular/core';
import { FavorDTO } from '../../modelo/dto/favor-dto';
import { TipoPagoEnum } from '../../modelo/enum/tipo-pago-enum';
import { Router } from '@angular/router';
import { EstadofavorEnum } from '../../modelo/enum/estado-favor-enum';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from 'src/app/servicios/librerias/storage.service';
import { Constantes } from '../../compartido/constantes';
import { TipoFavorEnum } from '../../modelo/enum/tipo-favor-enum';

@Component({
  selector: 'app-item-favor',
  templateUrl: './item-favor.component.html',
  styleUrls: ['./item-favor.component.scss'],
})
export class ItemFavorComponent implements OnInit {

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
        this.router.navigate(['/favor-recibido', this.favor.id]);
      }
    }];
    if(this.tipoFavor==TipoFavorEnum.solicitado){
      opciones.push({
        text: 'Editar',
        icon: 'create-outline',
        handler: () => {
          this.router.navigate(['/solicitud', this.favor.id]);
        }
      })
    }
    this.pesentarOpciones(opciones);
  }

  abrirFavor(){
    this.router.navigate(['/favor-recibido', this.favor.id]);
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
      console.log("error: "+err);
    });
  }

  establecerTipoFavor(){
    if((this.favor.usuarioSolicita && this.usuario==(this.favor.usuarioSolicita as any) ) || 
      (this.favor.usuarioSolicita.usuario && this.usuario==this.favor.usuarioSolicita.usuario)){
      this.tipoFavor=TipoFavorEnum.solicitado;
    }
    if((this.favor.usuarioRealiza && this.usuario==(this.favor.usuarioRealiza as any) ) || 
      (this.favor.usuarioRealiza.usuario && this.usuario==this.favor.usuarioRealiza.usuario)){
      this.tipoFavor=TipoFavorEnum.realizado;
    }
  }
}
