# ACOLITAPP
Este es el repositorio de la App acolitapp, realizado como trabajo final de master.


## Instalaciones necesarias para ejecutar la aplicación

* [Google Chrome](https://www.google.com/chrome/)

* [Visual Studio Code](https://code.visualstudio.com/)

* [Git](https://git-scm.com/)
```
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```
* [Node](https://nodejs.org/es/)

* [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQjwhb36BRCfARIsAKcXh6GRXJN_hJrabNpOE94384hWx1uh4qPgqVQBiZJMkDEcNUgTQf3UwZoaAr-ZEALw_wcB&gclsrc=aw.ds)

* [AngularCLI](https://cli.angular.io/)

* [ionic framework](https://ionicframework.com/)


## Clonar el aplicativo

Una vez instaladas las herramientas, acceda a **visual studio code** o a **git** y desde la terminal clone este proyecto:

```bash
git clone https://github.com/jorg3lui5/acolitapp.git
```
Una vez clonado el proyecto, ingrese a la carpeta del proyecto y compile.

## Compilación y ejecución del aplicativo 

Para compilar primero debe instalar las dependencias del proyecto. Para esto, debe ejecutar el siguiente comando:
```bash
npm install --save
```
Una vez instaladas las dependencias, compile y ejecute el proyecto con el siguiente comando:
```bash
ionic serve
```

## Construir el aplicativo para android

Para que se genere el proyecto android a partir del código de ionic, se debe ejecutar los siguientes comandos.

```bash
ionic build
ionic capacitor add android
ionic capacitor build android --prod
```

## Ejecutar el aplicativo android con android studio.
* Abir con Android Studio, la carpeta Android que se encuentra en la raiz del proyecto.
* Ejecute el proyecto con Android Studio, utilizando un emulador o un dispositivo físico, o simplemente vuelva a generar el APK e instálelo en su dispositivo Android
