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
import { ActivatedRoute, Router } from '@angular/router';
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
  paises: string[];
  ciudades: string[];
  nivelesEstudios: string[];
  profesiones: string[];
  ocupaciones: string[];
  tiposLicencia: string[];
  tiposVehiculos: string[];

  persona: Persona;
  usuario: string;

  formularioDatosPersonales: FormGroup = this.formBuilder.group({
    identificacion: ['', Validators.required],
    nombresApellidos: ['', Validators.compose([Validators.required,Validators.minLength(5)])],
    pais: ['', ],
    ciudad: ['', ],
    direccion: ['', Validators.compose([Validators.required])],
    telefono: ['', Validators.compose([Validators.required])],
    nivelEstudios: ['', ],
    profesion: ['', ],
    ocupacion: ['', Validators.compose([Validators.required])],
    tipoLicencia: ['', ],
    tipoVehiculo: ['', ],
    placaVehiculo: ['',],
    informacionAdicional: ['', Validators.compose([Validators.maxLength(500)])],
    nacionalidad: ['', ],
  });

  get identificacion() {
    return this.formularioDatosPersonales.get('identificacion');
  }
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
  get nacionalidad() {
    return this.formularioDatosPersonales.get('nacionalidad');
  }

  mensajesError = {
    identificacion: [
      {tipo: 'required', mensaje: 'La identificación es requerida'},
    ],
    nombresApellidos: [
      {tipo: 'required', mensaje: 'Los nombres son requeridos'},
      {tipo: 'minlength', mensaje: 'Debe tener mínimo 5 caracteres'},
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
      {tipo: 'maxlength', mensaje: 'Debe ingresar máximo 500 caracteres'},

    ],
    nacionalidad: [
      {tipo: 'required', mensaje: 'La nacionalidad requerida'},
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
    private router: Router,

  )
  {

  }

  ngOnInit() {
    this.recuperarPaises();
    this.recuperarNivelesEstudio();
    this.recuperarOcupaciones();
    this.recuperarTiposLicencia();
    this.recuperarTiposVehiculo();
    this.recuperarUsuario();
  }
  
  recuperarPaises(){
    this.paises=this._paisService.listarTodos();
  }

  recuperarNivelesEstudio(){
    this.nivelesEstudios=this._nivelEstudiosService.listarTodos();
  }

  recuperarOcupaciones(){
    this.ocupaciones=this._ocupacionService.listarTodos();
  }

  recuperarTiposLicencia(){
    this.tiposLicencia=this._tipoLicenciaService.listarTodos();
  }

  recuperarTiposVehiculo(){
    this.tiposVehiculos=this._tipoVehiculoService.listarTodos();
  }

  recuperarProfesiones(){
    this.profesiones=this._profesionService.listarTodos();
  }
  
  recuperarCiudadesPorPais(pais){
    this.ciudades=this._ciudadService.listarPorPais(pais);
  }

  recuperarNacionalidadPorPais(pais){
    return this._nacionalidadService.recuperarPorPais(pais);
  }

  seleccionarPais(){
    this.ciudad.setValue('');
    this.ciudad.updateValueAndValidity();
    if(this.formularioDatosPersonales.value.pais){
      this.recuperarCiudadesPorPais(this.formularioDatosPersonales.value.pais);
      this.nacionalidad.setValue(this.recuperarNacionalidadPorPais(this.pais));
    }
    else{
      this.nacionalidad.setValue('');
    }
    this.nacionalidad.updateValueAndValidity();

  }
  seleccionarNivelEstudios()
  {
    this.profesion.setValue('');
    this.profesion.updateValueAndValidity();
    if(this.formularioDatosPersonales.value.nivelEstudios=='Profesional'){
      this.recuperarProfesiones();
    }
  }

  seleccionarTipoVehiculo(){
    // this.placaVehiculo.setValue('');
    // this.placaVehiculo.updateValueAndValidity();
    if(this.formularioDatosPersonales.value.tipoVehiculo){
      this.placaVehiculo.setValidators([Validators.required]);
    }
    else{
      this.placaVehiculo.clearValidators();
    }
    this.placaVehiculo.updateValueAndValidity();
  }

  finalizar(){
    if(this.formularioDatosPersonales.valid){
      this.persona=this.formularioDatosPersonales.value;
      this.persona.usuario=this.usuario;
      console.log(this.persona);
      this.crearPersona(this.persona);
    }
    else{
      this.mostrarMensaje("Por favor llene los campos requeridos");
    }
  }

  crearPersona(persona) {
    this._personaService.crear(persona)
    .then((data)=>{
      console.log('data');
      this.mostrarMensaje("Usuario registrado satisfactoriamente");
      this.router.navigate(['/favores']);
      // this.navCtrl.navigateForward("/favores")
    })
    .catch(err=>{
        console.log("error: "+err);
        this.mostrarMensaje(err.message);
    });
  }

  compareWith = (o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  };

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          console.log('est');
          console.log(data);
          this.usuario=data;
        }
        else{
          this.mostrarMensaje("No pudo recuperar el usuario");
        }
      }
    )
    .catch(err=>{
        console.log("error: "+err);
        this.mostrarMensaje(err.message);
    });
  }
}
