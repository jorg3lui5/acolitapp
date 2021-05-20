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
Una vez instaladas las dependencias, **compile y ejecute el proyecto** con el siguiente comando:
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

## Ejecutar el aplicativo android con Android Studio.
* Abir con Android Studio, la carpeta Android que se encuentra en la raiz del proyecto.
* Ejecute el proyecto con Android Studio, utilizando un emulador o un dispositivo físico, o simplemente vuelva a generar el APK e instálelo en su dispositivo Android


## Uso del aplicativo
Para probar la funcionalidad y el objetivo del aplicativo siga los siguientes pasos:

* 1. Registre 2 usuarios en el aplicativo
* 2. Inicie sesión con un usuario o con los 2 al mismo tiempo.
* 3. Solicite un favor, pulsando el botón con signo más **(+)**
* 4. Una vez solicitado el favor, deberá aparecer en la lista de favores.
* 5. El otro usuario podrá ayudar con el favor solicitado, al dar clic en el título del favor.

A continuación se explica los estados que puede tener un favor y las acciones que pueden realizar el solicitante, el ayudante o cualquier otra persona que no haya aceptado el favor.

**Solicitado:**
Un favor tiene este estado cuando el usuario solicita el favor y aun nadie se ofrece a ayudarle.
Solicitante: puede CANCELAR la solicitud del favor. Esto eliminará el favor solicitado
Cualquier otro usuario: puede AYUDAR con el favor solicitado. AL momento que ayuda, el favor pasa a estado PENDIENTE

**Pendiente:**
UN favor tiene este estado cuando un usuario ofreció ayudar con el favor, pero el solicitante aún no acepta la ayuda.
Solicitante: puede ACEPTAR o RECHAZAR la ayuda ofrecida por el otro usuario. 
Si rechaza la ayuda, entonces el favor vuelve a estado SOLICITADO, hasta que alguien más acepte ayudarle.
Si acpeta 
Cualquier otro usuario: puede AYUDAR con el favor solicitado.
