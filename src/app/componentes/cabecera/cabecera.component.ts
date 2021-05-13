import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() menuVisible: boolean = false;
  @Input() ocultarBotones: boolean = false;
  
  constructor() { }

  ngOnInit() {}

}
