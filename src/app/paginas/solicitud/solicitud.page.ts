import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { Favor } from '../../modelo/favor';
import { DetalleTipoPago } from '../../modelo/detalleTipoPago';
import { TipoPagoService } from '../../servicios/tipo-pago.service';
import { TipoPago } from '../../modelo/tipoPago';
import { ToastController, LoadingController } from '@ionic/angular';
import { FavorService } from '../../servicios/favor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../servicios/librerias/storage.service';
import { TipoPagoEnum } from '../../modelo/enum/tipo-pago-enum';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadofavorEnum } from '../../modelo/enum/estado-favor-enum';


/* es la interfaz que permite al usuario solicitar un nuevo favor. Pues, deberá llenar el título, descripcion y forma de pago por el favor realizado. */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  constantes: Constantes = new Constantes;
  loading: HTMLIonLoadingElement;

  favor: Favor= new Favor();
  tiposPago: string[];
  tipoPagoEnum = TipoPagoEnum;
  usuario: string;
  idFavor:string;

  //define las validaciones para el formulario reactivo

  formularioNuevoFavor: FormGroup = this.formBuilder.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.compose([Validators.required,Validators.maxLength(500)])],
    tipoPago: ['', Validators.required],
    descripcionPago: ['', Validators.compose([Validators.required,Validators.maxLength(500)])],
    valorPago: [0, Validators.compose([Validators.required,Validators.min(1)])],
    
  });

  get titulo() {
    return this.formularioNuevoFavor.get('titulo');
  }

  get descripcion() {
    return this.formularioNuevoFavor.get('descripcion');
  }

  get tipoPago() {
    return this.formularioNuevoFavor.get('tipoPago');
  }

  get descripcionPago() {
    return this.formularioNuevoFavor.get('descripcionPago');
  }

  get valorPago() {
    return this.formularioNuevoFavor.get('valorPago');
  }

  mensajesError = {
    titulo: [
      {tipo: 'required', mensaje: 'El título es requerido'},
    ],
    descripcion: [
      {tipo: 'required', mensaje: 'La descripción es requerida'},
      {tipo: 'maxlength', mensaje: 'Debe ingresar máximo 500 caracteres'},
    ],
    tipoPago: [
      {tipo: 'required', mensaje: 'La forma de pago es requerida'},
    ],
    descripcionPago: [
      {tipo: 'required', mensaje: 'Este campo es requerido'},
      {tipo: 'maxlength', mensaje: 'Debe ingresar máximo 500 caracteres'},
    ],
    valorPago: [
      {tipo: 'required', mensaje: 'El valor a pagar es requerido'},
      {tipo: 'min', mensaje: 'El valor a pagar debe ser mayor a cero'},
    ],
  }

  
  constructor(
    private _tipoPagoService: TipoPagoService,
    public toastController: ToastController,
    private _storageService:StorageService,
    public _favorService: FavorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private loadingController: LoadingController,

  ) 
  {

  }

  ngOnInit() {
    this.iniciar();
  }

  async iniciar(){
    await this.mostrarLoading(this.constantes._cargandoDatos);
    this.listarTiposPago();
    this.idFavor=this.activatedRoute.snapshot.paramMap.get('idFavor');
    if(this.idFavor){
      this.recuperarFavor();
    }
    else{
      this.recuperarUsuario();
    }
  }

  //cuando se selecciona el tipo de pago coloca como requerido la descripcion del pago o el valor monetario según la forma de pago seleccionada.
  seleccionarTipoPago(){
    if(this.formularioNuevoFavor.value.tipoPago){
      if(this.formularioNuevoFavor.value.tipoPago==this.tipoPagoEnum.valorMonetario){
        this.descripcionPago.setValue('');
        this.descripcionPago.clearValidators();
        this.valorPago.setValidators(Validators.compose([Validators.required,Validators.min(1)]));
      }
      else{
        this.valorPago.setValue(0);
        this.valorPago.clearValidators();
        this.descripcionPago.setValidators(Validators.compose([Validators.required,Validators.maxLength(500)]));

      }
    }
    else{
      this.descripcionPago.setValue('');
      this.descripcionPago.clearValidators();
      this.valorPago.setValue(0);
      this.valorPago.clearValidators();
    }
    this.descripcionPago.updateValueAndValidity();
    this.valorPago.updateValueAndValidity();

  }

  //Crea un nuevo favor, almacenandolo en el forebase storage según los datos registrados en el formulario
  nuevoFavor(){
    if(this.formularioNuevoFavor.valid){
      this.favor=this.formularioNuevoFavor.value;
      this.favor.calificacionSolicita=0;
      this.favor.calificacionRealiza=0;
      this.favor.estado=EstadofavorEnum.solicitado;
      this.favor.direccionFavor=null;
      this.favor.fechaSolicita= Date.now();
      this.favor.usuarioSolicita=this.usuario;
      this.crearFavor(this.favor);
    }
    else{
      this.mostrarMensaje("Por favor llene los campos requeridos (*).");
    }
  }
  
  //Modifica el favor siempre y cuando el usuario solicitante fue quién ingresó a esta pantalla mediante el botón de edición
  modificaFavor(){
    if(this.formularioNuevoFavor.valid){
      this.favor.titulo=this.formularioNuevoFavor.value.titulo;
      this.favor.descripcion=this.formularioNuevoFavor.value.descripcion;
      this.favor.tipoPago=this.formularioNuevoFavor.value.tipoPago;
      this.favor.descripcionPago=this.formularioNuevoFavor.value.descripcionPago;
      this.favor.valorPago=this.formularioNuevoFavor.value.valorPago;

      this.actualizarFavor(this.favor);
    }
    else{
      this.mostrarMensaje("Por favor llene los campos requeridos (*).");
    }
  }

  //llama al metodo que almacena el favor de la base de datos, y una vez guardado, redirecciona a la lista de favores.
  crearFavor(favor){
    this.mostrarLoading(this.constantes._guardandoDatos);
    this._favorService.crear(favor)
    .then((data)=> {
      this.ocultarLoading();
      this.mostrarMensaje("Favor registrado satisfactoriamente");
      this.router.navigate(['/favores']);
    })
    .catch(err=>{
      this.ocultarLoading();
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
  }

  //Actializa el favor modificado y redirecciona a la pagina de favores.
  actualizarFavor(favor){
    this.mostrarLoading(this.constantes._actualizandoDatos);
    this._favorService.actualizar(favor,this.idFavor)
    .then((data)=> {
      this.ocultarLoading();
      this.mostrarMensaje("Favor modificado correctamente");
      this.router.navigate(['/favores']);
    })
    .catch(err=>{
      this.ocultarLoading();
      console.log("error: "+err);
      this.mostrarMensaje(err.message);
    });
  }

  listarTiposPago(){
    this.tiposPago=this._tipoPagoService.listarTodos();
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1 === o2 : o1 === o2;
  };

  compareWith = this.compareWithFn;

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: this.constantes._duracionToast
    });
    toast.present();
  }

  //recupera el nombre del usuario almacenado en el local storage.
  recuperarUsuario(){
    this._storageService.recuperar(this.constantes._usuario).then(
      (data:string)=>{
        if(data){
          this.usuario=data;
          this.ocultarLoading();
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

  //obtiene el favor según el id pasado como parámetro. Esta funcion se llama cuando se va a editar el favor.
  recuperarFavor(){
    this._favorService.recuperarPorId(this.idFavor).subscribe(res => {
      this.favor= {...<any>res};
      this.actualizarCampos(this.favor);
      this.ocultarLoading();
    },
    (error)=>{
      this.ocultarLoading();
      console.log(error);
    }
    ); 
  }

  //actualiza los campos del formulario cuando recupera un favor mediante el ID. Además establece los campos requeridos.-
  actualizarCampos(favor:Favor){

    this.formularioNuevoFavor.patchValue({
      titulo: favor.titulo,
      descripcion: favor.descripcion,
      tipoPago: favor.tipoPago,
      descripcionPago: favor.descripcionPago,
      valorPago: favor.valorPago,
    });

    if(this.formularioNuevoFavor.value.tipoPago==this.tipoPagoEnum.valorMonetario){
      this.descripcionPago.setValue('');
      this.descripcionPago.clearValidators();
      this.valorPago.setValidators(Validators.compose([Validators.required,Validators.min(1)]));
    }
    else{
      this.valorPago.setValue(0);
      this.valorPago.clearValidators();
      this.descripcionPago.setValidators(Validators.compose([Validators.required,Validators.maxLength(500)]));
    }
    this.descripcionPago.updateValueAndValidity();
    this.valorPago.updateValueAndValidity();
  }

  async mostrarLoading(message: string) {
    this.loading = await this.loadingController.create({
      message:message,
      showBackdrop: true,
    });
    await this.loading.present();
  }

  ocultarLoading(){
    this.loading.dismiss();
  }
}
