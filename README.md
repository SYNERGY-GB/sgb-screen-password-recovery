<h1>SGB-screen-password-recovery</h1>

<h3>Propósito</h3>

Esta pantalla permite a un usuario recuperar su contraseña.

<h3>Datos esperados</h3>

- **screenTitle**: Título de la pantalla 
- **welcomeMessage**: Mensaje de bienvenida a la aplicación
- **screenMessage**: Mensaje dirigido al usuario 
- **inputMessage** : Mensaje tipo placeholder en el campo
- **nextMessage** : Mensaje para avanzar

<h3>Parametrización</h3>

Los parámetros permiten modificar el nombre de los campos según los requerimientos de la aplicación. Tambíen se puede indicar una expresión regular para validar que el campo con la información usuario cumple con el formato

- **templateType**: función o nombre que permita identificar el template a utilizar para la pantalla.
- **usernameRegexp** : expresión regular que valida el usuario

<h3>Ejemplo de configuracion del archivo screen.ts</h3>
<pre>
passwordRecovery":{
    type:'sgb-screen-password-recovery',
        dataSource:{
        type: 'sgb-datasource-json#1.0',
        params: {
            path: 'archivoDePrueba.JSON'
        }
    },
    params: {
        title:"Hello there! I'm the title",
        usernameRegexp :"[^a-zA-Z0-9]"
    }
}
</pre>
    


<h3>Diseño</h3>

![Alt Text](https://s3.amazonaws.com/megazord-framework/balsamiq+mockups/sgb-screen-password-recovery.png)