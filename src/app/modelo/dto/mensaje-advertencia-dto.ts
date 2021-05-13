export class MensajeAdvertenciaDTO {
    titulo: string;
    subtitulo: string;
    mensaje: string;
    botonAceptar: string;
    botonCancelar: string;


    constructor(titulo?:string, subtitulo?:string, mensaje?:string, botonAceptar?:string, botonCancelar?:string){
        this.titulo=titulo;
        this.subtitulo=subtitulo;
        this.mensaje=mensaje;
        this.botonAceptar=botonAceptar;
        this.botonCancelar=botonCancelar;
    }
}