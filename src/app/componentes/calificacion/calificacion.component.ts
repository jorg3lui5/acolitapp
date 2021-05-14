import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss'],
})
export class CalificacionComponent implements OnInit {
  constantes: Constantes= new Constantes();
  calificacion: number = 0;
  constructor(
    private modalController: ModalController,
    public toastController: ToastController,

  ) { }

  ngOnInit() {}

  calificar(calificacion:number){
    this.calificacion=calificacion;
  }

  aceptar(){
    if(this.calificacion==0){
        this.mostrarMensaje("Debe calificar con un valor de 1 a 5 estrellas");
        return null;
    }
    this.modalController.dismiss({
      calificacion: this.calificacion,
    });

  }

  cancelar(){
    this.modalController.dismiss();

  }


  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

}
