import { Component, Input, OnInit } from '@angular/core';
import { FavorDTO } from '../../modelo/dto/favor-dto';
import { TipoPagoEnum } from '../../modelo/enum/tipo-pago-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-favor',
  templateUrl: './item-favor.component.html',
  styleUrls: ['./item-favor.component.scss'],
})
export class ItemFavorComponent implements OnInit {

  @Input() favor: FavorDTO;
  @Input() tipoFavor: string;
  tipoPagoEnum = TipoPagoEnum;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  mostrarOpciones(){

  }

  abrirFavor(){
    this.router.navigate(['/favor-recibido', this.favor.id]);
  }
}
