import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Favor } from '../../modelo/favor';
import { DetalleTipoPago } from '../../modelo/detalleTipoPago';
import { TipoPagoService } from '../../servicios/tipo-pago.service';
import { TipoPago } from '../../modelo/tipoPago';
import { ToastController } from '@ionic/angular';
import { FavorService } from '../../servicios/favor.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  constantes: Constantes = new Constantes;

  favor: Favor= new Favor();
  tiposPago: TipoPago[];
  
  constructor(
    private _tipoPagoService: TipoPagoService,
    public toastController: ToastController,
    public _favorService: FavorService,
  ) 
  {
    this.favor.detalleTipoPago=new DetalleTipoPago();
    
  }

  ngOnInit() {
    this.listarTiposPago();
  }



  solicitar(){
    if(this.favor.titulo && this.favor.descripcion && this.favor.detalleTipoPago.tipoPago &&
      ((this.favor.detalleTipoPago.tipoPago.nombre=='Valor Monetario' && this.favor.detalleTipoPago.valor) || this.favor.detalleTipoPago.descripcion))
    {
      this.crearFavor(this.favor);
    }
    else{
      this.mostrarMensaje('Todos los campos son requeridos');
    }
  }

  crearFavor(favor){
    
    this._favorService.crear(favor).subscribe(
      (data)=> {
        if(data && data.status=="OK"){
          if(data.objeto){
            this.favor=data.objeto;
          }
          else{
            this.mostrarMensaje("No se pudo solicitar el favor");
          }
        }
        else{
          this.mostrarMensaje(data.message);
        }
      },
      (error)=>{
        console.log(error);
        this.mostrarMensaje(error);
      }
    )
  }

  listarTiposPago(){
    this._tipoPagoService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.tiposPago=data.objeto;
        }
        else{
          this.mostrarMensaje(data.message);
        }
      },
      (error)=>{
        console.log(error);
        this.mostrarMensaje(error);
      }
    )
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.nombre === o2.nombre : o1 === o2;
  };

  compareWith = this.compareWithFn;

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
