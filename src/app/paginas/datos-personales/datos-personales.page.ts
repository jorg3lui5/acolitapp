import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Direccion } from '../../modelo/direccion';
import { Ciudad } from '../../modelo/ciudad';
import { Pais } from '../../modelo/pais';
import { PaisService } from '../../servicios/pais.service';
import { CiudadService } from '../../servicios/ciudad.service';
import { NacionalidadService } from '../../servicios/nacionalidad.service';
import { Nacionalidad } from '../../modelo/nacionalidad';
import { NivelEstudios } from '../../modelo/nivelEstudios';
import { NivelEstudiosService } from '../../servicios/nivel-estudios.service';
import { ProfesionService } from '../../servicios/profesion.service';
import { Profesion } from '../../modelo/profesion';
import { Ocupacion } from '../../modelo/ocupacion';
import { OcupacionService } from '../../servicios/ocupacion.service';
import { TipoVehiculo } from '../../modelo/tipoVehiculo';
import { Persona } from '../../modelo/persona';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TipoLicenciaService } from '../../servicios/tipo-licencia.service';
import { TipoVehiculoService } from '../../servicios/tipo-vehiculo.service';
import { TipoLicencia } from '../../modelo/tipoLicencia';
import { Vehiculo } from '../../modelo/vehiculo';
import { VehiculoPersona } from '../../modelo/vehiculoPersona';
import { PersonaService } from '../../servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../servicios/librerias/storage.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {

  constantes: Constantes = new Constantes;
  paises: Pais[];
  ciudades: Ciudad[];
  nivelesEstudios: NivelEstudios[];
  profesiones: Profesion[];
  ocupaciones: Ocupacion[];
  tiposLicencia: TipoLicencia[];
  tiposVehiculos: TipoVehiculo[];

  persona: Persona;

  formularioDatosPersonales: FormGroup = this.formBuilder.group({
    //identificacion: ['', Validators.required],
    nombresApellidos: ['', Validators.compose([Validators.required])],
    pais: ['', Validators.compose([Validators.required])],
    ciudad: ['', Validators.compose([Validators.required])],
    direccion: ['', Validators.compose([Validators.required])],
    telefono: ['', Validators.compose([Validators.required])],
    nivelEstudios: ['', ],
    profesion: ['', ],
    ocupacion: ['', Validators.compose([Validators.required])],
    tipoLicencia: ['', ],
    tipoVehiculo: ['', ],
    placaVehiculo: ['',],
    informacionAdicional: ['', ],
  });

  get nombresApellidos() {
    return this.formularioDatosPersonales.get('nombresApellidos');
  }
  get pais() {
    return this.formularioDatosPersonales.get('pais');
  }
  get ciudad() {
    return this.formularioDatosPersonales.get('ciudad');
  }
  get direccion() {
    return this.formularioDatosPersonales.get('direccion');
  }
  get telefono() {
    return this.formularioDatosPersonales.get('telefono');
  }
  get nivelEstudios() {
    return this.formularioDatosPersonales.get('nivelEstudios');
  }
  get profesion() {
    return this.formularioDatosPersonales.get('profesion');
  }
  get ocupacion() {
    return this.formularioDatosPersonales.get('ocupacion');
  }
  get tipoLicencia() {
    return this.formularioDatosPersonales.get('tipoLicencia');
  }
  get tipoVehiculo() {
    return this.formularioDatosPersonales.get('tipoVehiculo');
  }
  get placaVehiculo() {
    return this.formularioDatosPersonales.get('placaVehiculo');
  }
  get informacionAdicional() {
    return this.formularioDatosPersonales.get('informacionAdicional');
  }

  mensajesError = {
    // identificacion: [
    //   {tipo: 'required', mensaje: 'La identificación es requerida'},
    // ],
    nombresApellidos: [
      {tipo: 'required', mensaje: 'Los nombres son requeridos'},
    ],
    pais: [
      {tipo: 'required', mensaje: 'El país es requerido'},
    ],
    ciudad: [
      {tipo: 'required', mensaje: 'La ciudad es requerida'},
    ],
    direccion: [
      {tipo: 'required', mensaje: 'La ciudad es requerida'},
    ],
    telefono: [
      {tipo: 'required', mensaje: 'La ciudad es requerida'},
    ],
    
    nivelEstudios: [
      {tipo: 'required', mensaje: 'El nivel de estudios es requerido'},
    ],
    profesion: [
      {tipo: 'required', mensaje: 'La profesión es requerida'},
    ],
    ocupacion: [
      {tipo: 'required', mensaje: 'La ocupación es requerida'},
    ],
    tipoLicencia: [
      {tipo: 'required', mensaje: 'El tipo de licencia es requerido'},
    ],
    tipoVehiculo: [
      {tipo: 'required', mensaje: 'El tipo de vehículo es requerido'},
    ],
    placaVehiculo: [
      {tipo: 'required', mensaje: 'La placa del vehículo es requerida'},
    ],
    informacionAdicional: [
      {tipo: 'required', mensaje: 'La información adicional es requerida'},
    ]
  }

  constructor(
    private _usuarioService: UsuarioService,
    private _paisService: PaisService,
    private _ciudadService: CiudadService,
    private _nacionalidadService: NacionalidadService,
    private _nivelEstudiosService: NivelEstudiosService,
    private _profesionService: ProfesionService,
    private _ocupacionService: OcupacionService,
    public toastController: ToastController,
    public activatedRoute : ActivatedRoute,
    public _tipoLicenciaService:TipoLicenciaService,
    public _tipoVehiculoService:TipoVehiculoService,
    public _personaService: PersonaService,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _storageService:StorageService,
  )
  {

  }

  ngOnInit() {
    if(this.nombreUsuario){
      this.recuperarPersonaPorNombreUsuario(this.nombreUsuario);
      this.recuperarNivelesEstudio();
      this.recuperarOcupaciones();
      this.recuperarPaises();
      this.recuperarTiposLicencia();
      this.recuperarTiposVehiculo();
    }
  }

  seleccionarPais(){
    this.ciudad=null;
    this.recuperarCiudadesPorIdPais(this.pais.id);
    this.recuperarNacionalidadPorIdPais(this.pais.id);
  }
  seleccionarNivelEstudios()
  {
    if(this.persona.nivelEstudios && this.persona.nivelEstudios.nombre=='Profesional'){
      this.recuperarProfesiones();
    }
  }

  finalizar(){

    if(this.persona.direccionList && this.persona.direccionList.length>0){
     this.persona.direccionList[0].ciudad=this.ciudad;
    }
    else{
        let direccion: Direccion=new Direccion();
        direccion.ciudad=this.ciudad;
        this.persona.direccionList=[];
        this.persona.direccionList.push(direccion);
    }
    if(this.persona.vehiculoPersonaList && this.persona.vehiculoPersonaList.length>0 && this.persona.vehiculoPersonaList[0].vehiculo){
      this.persona.vehiculoPersonaList[0].vehiculo.tipoVehiculo=this.tipoVehiculo;
      this.persona.vehiculoPersonaList[0].vehiculo.placa=this.placaVehiculo;
    }
    else{
      let vehiculo:Vehiculo=new Vehiculo();
      vehiculo.tipoVehiculo=this.tipoVehiculo;
      vehiculo.placa=this.placaVehiculo;
      let vehiculoPersona:VehiculoPersona=new VehiculoPersona();
      vehiculoPersona.vehiculo=vehiculo;
      this.persona.vehiculoPersonaList=[];
      this.persona.vehiculoPersonaList.push(vehiculoPersona);
    }
    this.actualizarPersona(this.persona);
  }

  actualizarPersona(persona) {
    if(persona.nombresApellidos)
    {
      this._personaService.actualizar(persona).subscribe(
        (data)=> {
          if(data && data.status=="OK"){
            if(data.objeto){
              this.persona=data.objeto;
              this.mostrarMensaje("Usuario registrado satisfactoriamente");
              this.navCtrl.navigateForward("/favores")
            }
            else{
              this.mostrarMensaje("No se pudo actualizar los datos de la persona");
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
    else{
      this.mostrarMensaje("Los nombres y apellidos son obligatorios");
    }
  }

  recuperarPersonaPorNombreUsuario(nombreUsuario){
    // this._usuarioService.recuperarPorUsuario(nombreUsuario).subscribe(
    //   (data)=> {
    //     if(data && data.status=="OK"){
    //       if(data.objeto){
    //         this.persona=data.objeto;
    //         if(this.persona.direccionList && this.persona.direccionList.length>0 && this.persona.direccionList[0].ciudad){
    //          this.pais=this.persona.direccionList[0].ciudad.pais;
    //          this.ciudad=this.persona.direccionList[0].ciudad;
    //         }
    //         if(this.persona.vehiculoPersonaList && this.persona.vehiculoPersonaList.length>0 && this.persona.vehiculoPersonaList[0].vehiculo){
    //           this.tipoVehiculo=this.persona.vehiculoPersonaList[0].vehiculo.tipoVehiculo;
    //           this.placaVehiculo=this.persona.vehiculoPersonaList[0].vehiculo.placa;
    //         }
    //       }
    //       else{
    //         this.persona=new Persona();
    //       }
    //     }
    //     else{
    //       this.mostrarMensaje(data.message);
    //     }
    //   },
    //   (error)=>{
    //     console.log(error);
    //     this.mostrarMensaje(error);
    //   }
    // )
  }

  recuperarPaises(){
    this._paisService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.paises=data.objeto;
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

  recuperarNivelesEstudio(){
    this._nivelEstudiosService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.nivelesEstudios=data.objeto;
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
  recuperarProfesiones(){
    this._profesionService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.profesiones=data.objeto;
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
  recuperarTiposLicencia(){
    this._tipoLicenciaService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.tiposLicencia=data.objeto;
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
  recuperarTiposVehiculo(){
    this._tipoVehiculoService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.tiposVehiculos=data.objeto;
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
  recuperarOcupaciones(){
    this._ocupacionService.listarTodos().subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.ocupaciones=data.objeto;
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
  recuperarCiudadesPorIdPais(idPais){
    this._ciudadService.listarPorIdPais(this.pais.id).subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.ciudades=data.objeto;
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

  recuperarNacionalidadPorIdPais(idPais){
    this._nacionalidadService.recuperarPorIdPais(idPais).subscribe(
      (data)=> {
        if(data && data.status=="OK"){
            this.persona.nacionalidad=data.objeto;
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

  compareWith = (o1: Persona, o2:Persona) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
