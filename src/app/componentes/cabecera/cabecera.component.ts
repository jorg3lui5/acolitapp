import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent implements OnInit {

/*   visualiza el toolbar en cada una de las pantallas de la aplicación. 
    El toolbar muestra el título de la pantalla actual y el botón que regresa a la pantalla anterior o el botón que despliega el menú lateral.
 */  
  @Input() titulo: string = '';
  @Input() menuVisible: boolean = false;
  @Input() ocultarBotones: boolean = false;
  
  constructor() { }

  ngOnInit() {}

}
